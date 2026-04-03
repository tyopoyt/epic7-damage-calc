import { test as base, Page } from '@playwright/test';

/**
 * Worker-scoped page fixture. The Angular app is loaded once per worker and
 * reused across all tests assigned to that worker, eliminating per-test
 * bootstrap overhead (~2-3s saved per test).
 */
export const test = base.extend<object, { workerPage: Page }>({
  workerPage: [async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    await page.locator('#hero-select').waitFor({ state: 'visible' });
    await use(page);
    await context.close();
  }, { scope: 'worker' }],
});

export { expect } from '@playwright/test';
