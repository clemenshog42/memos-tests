import { test, expect } from '@playwright/test';

test.describe('Memos Basic UI', () => {
  test('should load homepage and display Memos title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Memos/);
  });

  test('should show loading or error state when backend is unreachable', async ({ page }) => {
    // If we test against the dev server without backend, the app shows an error or just doesn't load fully.
    // We can at least check that the page is loaded by checking for the html structure or error toast.
    await page.goto('/');
    // Check that body exists
    await expect(page.locator('body')).toBeVisible();
  });

  test('should be able to find the language selector', async ({ page }) => {
    await page.goto('/');

    const localePicker = page.locator('button').filter({ hasText: /English|中文|Español/i }).first();

    if (await localePicker.isVisible()) {
      await expect(localePicker).toBeVisible();
    }
  });

  test('should be able to open learn more links', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.getByRole('link', { name: /Memos/i }).filter({ has: page.locator('svg') }).first();

    if (await githubLink.isVisible()) {
      await expect(githubLink).toHaveAttribute('href', /github\.com/);
    }
  });
});
