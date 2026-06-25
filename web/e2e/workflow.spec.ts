import { test, expect } from '@playwright/test';
import path from 'path';

test.describe.serial('Memos Full Workflow', () => {
  // NOTE: This test requires the full Memos backend to be running.
  
  test.beforeEach(async ({ page }) => {
    // Generate a unique user for this test run
    const uniqueUser = `user${Date.now()}`;

    // Try going directly to signup
    await page.goto('/auth/signup');
    await page.waitForTimeout(1000);

    // If it redirected back to /auth, maybe signup is disabled or it's not the first run.
    // If we are on signup, register.
    if (page.url().includes('signup')) {
      await page.fill('input[type="text"]', uniqueUser);
      await page.fill('input[type="password"]', 'password123');
      await page.click('button:has-text("Sign up")');
      await page.waitForURL((url) => url.pathname === '/');
    } else {
      // If we are on /auth, we can try to click the Sign up link
      const signUpLink = page.locator('a:has-text("Sign up")');
      if (await signUpLink.isVisible()) {
        await signUpLink.click();
        await page.waitForURL('**/signup*');
        await page.fill('input[type="text"]', uniqueUser);
        await page.fill('input[type="password"]', 'password123');
        await page.click('button:has-text("Sign up")');
        await page.waitForURL((url) => url.pathname === '/');
      } else {
        // Wait for redirect to home
        await page.waitForURL((url) => url.pathname === '/');
      }
    }

    // Ensure we are logged in by checking if the editor exists
    const editor = page.getByRole('textbox').first();
    await expect(editor).toBeVisible({ timeout: 10000 });
  });

  test('should create a memo', async ({ page }) => {
    const editor = page.locator('.memo-wysiwyg, .memo-editor-content textarea').first();
    const uniqueMemoText = `Create test memo ${Date.now()}`;
    await editor.fill(uniqueMemoText);
    
    const saveButton = page.getByRole('button', { name: /Save/i });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    await expect(editor.first()).toBeEmpty();

    const memoContent = page.getByText(uniqueMemoText);
    await expect(memoContent).toBeVisible();
  });

  test('should delete a memo', async ({ page }) => {
    // Create a memo first
    const editor = page.locator('.memo-wysiwyg, .memo-editor-content textarea').first();
    const uniqueMemoText = `Delete test memo ${Date.now()}`;
    await editor.fill(uniqueMemoText);
    await page.getByRole('button', { name: /Save/i }).click();

    // Verify it exists
    const memoContent = page.getByText(uniqueMemoText);
    await expect(memoContent).toBeVisible();

    // Delete the Memo
    const memoCard = page.locator('article').filter({ hasText: uniqueMemoText }).first();
    await memoCard.hover();
    
    const dotsButton = memoCard.locator('button[aria-haspopup="menu"]').first();
    await dotsButton.click();
    
    const deleteOption = page.getByRole('menuitem', { name: /Delete/i });
    await deleteOption.click();
    
    const confirmButton = page.getByRole('button', { name: /Confirm|Delete|Yes/i }).last();
    await confirmButton.click();

    // Verify it is removed
    await expect(memoContent).not.toBeVisible();
  });

  test('should archive a memo', async ({ page }) => {
    // Create a memo first
    const editor = page.locator('.memo-wysiwyg, .memo-editor-content textarea').first();
    const uniqueMemoText = `Archive test memo ${Date.now()}`;
    await editor.fill(uniqueMemoText);
    await page.getByRole('button', { name: /Save/i }).click();

    const memoContent = page.getByText(uniqueMemoText);
    await expect(memoContent).toBeVisible();

    // Archive the Memo
    const memoCard = page.locator('article').filter({ hasText: uniqueMemoText }).first();
    await memoCard.hover();
    
    const dotsButton = memoCard.locator('button[aria-haspopup="menu"]').first();
    await dotsButton.click();
    
    const archiveOption = page.getByRole('menuitem', { name: /Archive/i });
    await archiveOption.click();
    
    // In Memos, archiving might prompt confirmation or just do it
    const confirmButton = page.getByRole('button', { name: /Confirm|Yes/i }).last();
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }

    // Verify it is removed from the active feed
    await expect(memoContent).not.toBeVisible();
  });

  test('should attach a file to a memo', async ({ page }) => {
    // Start typing
    const editor = page.locator('.memo-wysiwyg, .memo-editor-content textarea').first();
    const uniqueMemoText = `Attachment test memo ${Date.now()}`;
    await editor.fill(uniqueMemoText);

    // Find the file input and attach a file (we can use package.json)
    const fileInput = page.locator('input[type="file"]').first();
    
    // We assume the test runs from the `web` folder, so `package.json` is at `./package.json`
    await fileInput.setInputFiles(path.resolve(__dirname, '../package.json'));

    // Wait for the attachment to upload/preview to appear
    // Usually Memos shows a small file preview or icon inside the editor area
    // We'll just wait a bit and save
    await page.waitForTimeout(1000);

    const saveButton = page.getByRole('button', { name: /Save/i });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    // Verify the memo exists
    const memoContent = page.getByText(uniqueMemoText);
    await expect(memoContent).toBeVisible();

    // Verify the attachment is rendered in the memo
    const memoCard = page.locator('article').filter({ hasText: uniqueMemoText }).first();
    const attachmentElement = memoCard.getByText('package.json');
    await expect(attachmentElement).toBeVisible();
  });
});
