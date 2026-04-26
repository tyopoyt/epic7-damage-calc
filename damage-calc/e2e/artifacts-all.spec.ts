/**
 * E2E regression tests: all hero+artifact combinations.
 *
 * One test per hero/artifact pair (vs artifacts.spec.ts which tests one hero
 * per unique artifact). Each test:
 *  1. Navigates to the damage calculator.
 *  2. Selects the hero.
 *  3. Selects the artifact.
 *  4. Reads the damage table.
 *  5. Compares every skill row against the snapshot.
 */

import { test, expect } from './fixtures';
import { selectHero, selectArtifact, readDamageTable } from './helpers';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const snapshots = require('../src/testing/damage-snapshots.json') as Record<
  string,
  Record<string, Record<string, { skill: string; crit: number | null; crush: number | null; normal: number | null; miss: number | null }>>
>;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const translations: { heroes: Record<string, string>; artifacts: Record<string, string> } =
  require('../src/assets/i18n/us.json');

const heroTranslations = translations.heroes;
const artifactTranslations = translations.artifacts;

for (const [heroId, heroSnapshots] of Object.entries(snapshots)) {
  for (const [artifactId, artifactSnapshots] of Object.entries(heroSnapshots)) {
    if (artifactId === 'noProc') continue;

    const heroName = heroTranslations[heroId] ?? heroId;
    const artifactName = artifactTranslations[artifactId] ?? artifactId;

    test(`artifact: ${heroId} + ${artifactId}`, async ({ workerPage: page }) => {
      await selectHero(page, heroName);
      await selectArtifact(page, artifactName);

      const table = await readDamageTable(page);

      for (const [skillId, expected] of Object.entries(artifactSnapshots)) {
        const actual = table[expected.skill];
        expect(actual, `${heroId} skill ${skillId} (data-skill="${expected.skill}") not found in damage table`).toBeDefined();
        expect(actual.crit, `${heroId} ${artifactId} ${skillId} crit`).toBe(expected.crit);
        expect(actual.crush, `${heroId} ${artifactId} ${skillId} crush`).toBe(expected.crush);
        expect(actual.normal, `${heroId} ${artifactId} ${skillId} normal`).toBe(expected.normal);
        expect(actual.miss, `${heroId} ${artifactId} ${skillId} miss`).toBe(expected.miss);
      }
    });
  }
}
