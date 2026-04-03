import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';
const isLocalhost = baseURL.includes('localhost');

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: process.env['CI'] ? 2 : 0,
  fullyParallel: true,
  workers: 16,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    headless: !process.env['HEADED'],
    viewport: { width: 1280, height: 900 },
    actionTimeout: 5_000,
  },
  // Auto-start ng serve when targeting localhost
  webServer: isLocalhost ? {
    command: 'ng serve',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  } : undefined,
  projects: [
    {
      name: 'noProc',
      testMatch: '**/noProc.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'artifacts',
      testMatch: '**/artifacts.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
