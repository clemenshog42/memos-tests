import { test, expect } from '@playwright/test';

test.describe('Memos Full Workflow', () => {
  // NOTE: This test requires the full Memos backend to be running.
  // It performs a real end-to-end workflow on the application.

  test('should create, view, and delete a memo', async ({ page }) => {
    // 1. Visit the home page, which redirects to login if not authenticated
    await page.goto('/auth');

    // Fill in the login form (Assuming a test user or demo user exists)
    // If the backend has no users, it might show the host signup page instead.
    // For this test, we assume a user 'demo' with password 'secret' exists, or we handle signup.
    
    // Check if we are on signup or signin
    const isSignUp = await page.getByText(/Sign up/i).isVisible();
    if (isSignUp) {
      await page.fill('input[type="text"]', 'testuser');
      await page.fill('input[type="password"]', 'password123');
      await page.click('button:has-text("Sign up")');
    } else {
      await page.fill('input[type="text"]', 'demo');
      await page.fill('input[type="password"]', 'secret');
      await page.click('button:has-text("Sign in")');
    }

    // Wait for redirect to home
    await page.waitForURL('**/');

    // Ensure we are logged in by checking if the editor exists
    const editor = page.locator('textarea[placeholder*="memo"], textarea');
    await expect(editor.first()).toBeVisible({ timeout: 10000 });

    // 2. Create a Memo
    const uniqueMemoText = `End-to-end test memo ${Date.now()}`;
    await editor.fill(uniqueMemoText);
    const saveButton = page.getByRole('button', { name: /Save/i });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    // Wait for the save request to complete and the textarea to clear
    await expect(editor.first()).toBeEmpty();

    // 3. View the Memo
    // The memo content should now appear in the feed
    const memoContent = page.getByText(uniqueMemoText);
    await expect(memoContent).toBeVisible();

    // 4. Delete the Memo
    // Find the 'more options' dropdown button for the specific memo we just created
    const memoCard = page.locator('.memo-wrapper').filter({ hasText: uniqueMemoText }).first();
    await memoCard.hover(); // Hover to reveal the actions menu
    
    // Click the more options (...) button
    const dotsButton = memoCard.locator('button').filter({ has: page.locator('svg.lucide-more-vertical, svg.lucide-more-horizontal') }).first();
    await dotsButton.click();
    
    // Click Delete
    const deleteOption = page.getByText(/Delete/i);
    await deleteOption.click();
    
    // Confirm deletion in the dialog
    const confirmButton = page.getByRole('button', { name: /Confirm|Delete|Yes/i }).last();
    await confirmButton.click();

    // Verify it is removed from the feed
    await expect(memoContent).not.toBeVisible();
  });
});
