/**
 * E2E regression tests: one test per unique artifact (excluding noProc).
 *
 * For each artifact, uses the first hero/skill combination found in the
 * snapshot that exercises it. Each test:
 *  1. Navigates to the damage calculator.
 *  2. Selects the hero.
 *  3. Selects the artifact.
 *  4. Reads the damage table.
 *  5. Compares the target skill row against the snapshot.
 *
 * BASE_URL env var controls the target (default: http://localhost:4200).
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

interface ArtifactTestCase {
  heroId: string;
  heroName: string;
  artifactId: string;
  artifactName: string;
  skillId: string;
  expected: { skill: string; crit: number | null; crush: number | null; normal: number | null; miss: number | null };
}

// For heroExclusive artifacts the option is disabled for non-matching heroes.
// Map each such artifact to the preferred hero IDs to try (in order).
const heroExclusivePreferred: Record<string, string[]> = {
  sword_of_cycling_seasons: ['adin', 'savior_adin', 'holy_flame_adin', 'serene_purity_adin', 'verdant_adin', 'new_kid_adin'],
};

// Build one test case per unique artifact
const seen = new Set<string>();
const artifactTestCases: ArtifactTestCase[] = [];

for (const [heroId, heroSnapshots] of Object.entries(snapshots)) {
  for (const [artifactId, artifactSnapshots] of Object.entries(heroSnapshots)) {
    if (artifactId === 'noProc') continue;
    if (seen.has(artifactId)) continue;
    seen.add(artifactId);

    // For heroExclusive artifacts, find the first compatible hero in the snapshot
    let resolvedHeroId = heroId;
    let resolvedArtifactSnapshots = artifactSnapshots;
    const preferred = heroExclusivePreferred[artifactId];
    if (preferred) {
      for (const candidate of preferred) {
        if (snapshots[candidate]?.[artifactId]) {
          resolvedHeroId = candidate;
          resolvedArtifactSnapshots = snapshots[candidate][artifactId];
          break;
        }
      }
    }

    const skillId = Object.keys(resolvedArtifactSnapshots)[0];
    artifactTestCases.push({
      heroId: resolvedHeroId,
      heroName: heroTranslations[resolvedHeroId] ?? resolvedHeroId,
      artifactId,
      artifactName: artifactTranslations[artifactId] ?? artifactId,
      skillId,
      expected: resolvedArtifactSnapshots[skillId],
    });
  }
}

for (const tc of artifactTestCases) {
  test(`artifact: ${tc.artifactId} (${tc.heroId})`, async ({ workerPage: page }) => {
    await selectHero(page, tc.heroName);
    await selectArtifact(page, tc.artifactName);

    const table = await readDamageTable(page);

    const actual = table[tc.expected.skill];
    expect(actual, `skill ${tc.skillId} (data-skill="${tc.expected.skill}") not found in damage table for ${tc.heroId} + ${tc.artifactId}`).toBeDefined();
    expect(actual.crit, `crit`).toBe(tc.expected.crit);
    expect(actual.crush, `crush`).toBe(tc.expected.crush);
    expect(actual.normal, `normal`).toBe(tc.expected.normal);
    expect(actual.miss, `miss`).toBe(tc.expected.miss);
  });
}
