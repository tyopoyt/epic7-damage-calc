/**
 * Snapshot generation script for DamageService regression tests.
 *
 * Run with: npm run test:snapshots:generate
 *
 * Iterates every hero × every valid artifact × every skill (including soulburn
 * and extra variants) and writes the getDamage() output to
 * src/testing/damage-snapshots.json.
 * This file is the ground truth — commit it after any intentional change.
 */

import { Heroes } from 'src/assets/data/heroes';
import { Artifacts } from 'src/assets/data/artifacts';
import { HeroClass } from 'src/app/models/hero';
import { DamageService, DamageRow } from 'src/app/services/damage.service';
import { HitType } from 'src/app/models/skill';
import { createMockEnv, setMaxMolagoras } from 'src/testing/mock-damage-test-env';
import * as fs from 'fs';
import * as path from 'path';

type ArtifactSnapshots = Record<string, DamageRow>;
type HeroSnapshots = Record<string, ArtifactSnapshots>;
const snapshots: Record<string, HeroSnapshots> = {};

const heroEntries = Object.entries(Heroes);
const artifactEntries = Object.entries(Artifacts);

const env = createMockEnv(heroEntries[0][1]);
const service = new DamageService(env.dataService as any, env.languageService as any);
const form = env.dataService.damageInputValues;

for (const [heroId, hero] of heroEntries) {
  if (heroId.endsWith('_old')) continue;

  env.dataService.currentHero.next(hero);
  setMaxMolagoras(form, hero);

  const validArtifacts = artifactEntries.filter(([id, artifact]) =>
    !id.endsWith('_old') &&
    (artifact.exclusive === HeroClass.common || artifact.exclusive === hero.class)
  );

  const heroSnapshots: HeroSnapshots = {};

  for (const [artifactId, artifact] of validArtifacts) {
    env.dataService.currentArtifact.next(artifact);
    const artifactSnapshots: ArtifactSnapshots = {};

    for (const [skillId, skill] of Object.entries(hero.skills)) {
      // Skip skills with no damage output (purely passive/utility skills)
      if (
        !skill.rate(false, form, false) &&
        !skill.pow(false, form) &&
        !skill.afterMath(HitType.crit, form, false) &&
        !skill.detonation(true, form)
      ) {
        continue;
      }

      artifactSnapshots[skillId] = service.getDamage(skill, false, false, skill.isCounter);

      if (skill.soulburn) {
        artifactSnapshots[`${skillId}_soulburn`] = service.getDamage(skill, true);
      }

      if (skill.canExtra && (artifact.extraAttackBonus || skill.extraModifier)) {
        artifactSnapshots[`${skillId}_extra`] = service.getDamage(skill, false, true);
      }
    }

    if (Object.keys(artifactSnapshots).length > 0) {
      heroSnapshots[artifactId] = artifactSnapshots;
    }
  }

  if (Object.keys(heroSnapshots).length > 0) {
    snapshots[heroId] = heroSnapshots;
  }
}

const outputPath = path.join(process.cwd(), 'src/testing/damage-snapshots.json');
fs.writeFileSync(outputPath, JSON.stringify(snapshots, null, 2));

const heroCount = Object.keys(snapshots).length;
const artifactCount = Object.values(snapshots).reduce((n, h) => n + Object.keys(h).length, 0);
const skillCount = Object.values(snapshots).reduce((n, h) =>
  n + Object.values(h).reduce((m, a) => m + Object.keys(a).length, 0), 0);
console.log(`Snapshots written: ${heroCount} heroes, ${artifactCount} hero×artifact combos, ${skillCount} total skill variants → ${outputPath}`);
