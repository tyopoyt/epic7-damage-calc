/**
 * E2E regression tests: noProc (no artifact proc) damage values.
 *
 * One test per hero. Each test:
 *  1. Navigates to the damage calculator.
 *  2. Selects the hero (artifact stays at "No Artifact Proc" default).
 *  3. Reads the damage table.
 *  4. Compares every skill row against the snapshot.
 *
 * BASE_URL env var controls the target (default: http://localhost:4200).
 */

import { test, expect } from './fixtures';
import { selectHero, readDamageTable } from './helpers';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const snapshots = require('../src/testing/damage-snapshots.json') as Record<
  string,
  Record<string, Record<string, { skill: string; crit: number | null; crush: number | null; normal: number | null; miss: number | null }>>
>;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const translations: { heroes: Record<string, string>; artifacts: Record<string, string> } =
  require('../src/assets/i18n/us.json');

const heroTranslations = translations.heroes;

for (const [heroId, heroSnapshots] of Object.entries(snapshots)) {
  const noProc = heroSnapshots['noProc'];
  if (!noProc) continue;

  const heroName = heroTranslations[heroId] ?? heroId;

  test(`noProc: ${heroId}`, async ({ workerPage: page }) => {
    await selectHero(page, heroName);

    const table = await readDamageTable(page);

    for (const [skillId, expected] of Object.entries(noProc)) {
      // expected.skill is the row's data-skill value (skill.name || skill.id),
      // which may differ from the outer snapshot key for _bis-style skills.
      const actual = table[expected.skill];
      expect(actual, `${heroId} skill ${skillId} (data-skill="${expected.skill}") not found in damage table`).toBeDefined();
      expect(actual.crit, `${heroId} ${skillId} crit`).toBe(expected.crit);
      expect(actual.crush, `${heroId} ${skillId} crush`).toBe(expected.crush);
      expect(actual.normal, `${heroId} ${skillId} normal`).toBe(expected.normal);
      expect(actual.miss, `${heroId} ${skillId} miss`).toBe(expected.miss);
    }
  });
}
