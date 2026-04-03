import { Page, expect } from '@playwright/test';

export interface SnapshotDamageRow {
  skill: string;
  crit: number | null;
  crush: number | null;
  normal: number | null;
  miss: number | null;
}

/** Navigate to the damage calculator and wait for the hero select to be ready. */
export async function navigateToCalc(page: Page): Promise<void> {
  await page.goto('/');
  await page.locator('#hero-select').waitFor({ state: 'visible' });
}

/**
 * Open a mat-select and click the first enabled option whose text contains
 * `optionText`. Playwright auto-scrolls the option into view.
 */
async function selectMatOption(
  page: Page,
  selectId: string,
  optionText: string,
): Promise<void> {
  await page.locator(`#${selectId}`).click();
  const panel = page.locator('.cdk-overlay-container .mat-mdc-select-panel').first();
  await panel.waitFor({ state: 'visible' });

  // Use exact text match so e.g. "Cartuja" doesn't match "Assassin Cartuja"
  await panel
    .locator('mat-option:not(.mat-mdc-option-disabled)')
    .filter({ hasText: new RegExp(`^\\s*${optionText}\\s*$`) })
    .first()
    .click();

  await panel.waitFor({ state: 'hidden' });
}

/** Select a hero by its English display name (from us.json translations). */
export async function selectHero(page: Page, heroName: string): Promise<void> {
  await selectMatOption(page, 'hero-select', heroName);
  // Wait for the mat-select trigger to reflect the new selection, which confirms
  // Angular has processed the hero change and re-rendered the damage table.
  await expect(page.locator('#hero-select .mat-mdc-select-value')).toContainText(heroName);
}

/** Select an artifact by its English display name (from us.json translations). */
export async function selectArtifact(page: Page, artifactName: string): Promise<void> {
  await selectMatOption(page, 'artifact-select', artifactName);
  // Wait for the mat-select trigger to reflect the new selection.
  await expect(page.locator('#artifact-select .mat-mdc-select-value')).toContainText(artifactName);
}

/**
 * Read all rows from the damage table.
 * Returns a map of skill-id → damage values.
 */
export async function readDamageTable(
  page: Page,
): Promise<Record<string, SnapshotDamageRow>> {
  const rows = await page.locator('#damage-table tr[data-skill]').all();
  const result: Record<string, SnapshotDamageRow> = {};

  for (const row of rows) {
    const skillId = await row.getAttribute('data-skill');
    if (!skillId) continue;

    const cells = await row.locator('td.mat-mdc-cell').allTextContents();
    const parse = (s: string): number | null => {
      const trimmed = s.trim().replace(/,/g, '');
      const n = parseInt(trimmed, 10);
      return isNaN(n) ? null : n;
    };

    result[skillId] = {
      skill: skillId,
      crit: parse(cells[1] ?? ''),
      crush: parse(cells[2] ?? ''),
      normal: parse(cells[3] ?? ''),
      miss: parse(cells[4] ?? ''),
    };
  }

  return result;
}
