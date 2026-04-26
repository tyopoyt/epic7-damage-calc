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
const outputPath = path.join(process.cwd(), 'src/testing/damage-snapshots.json');

const generateAll = process.argv.includes('--all');

const existing: Record<string, HeroSnapshots> = (!generateAll && fs.existsSync(outputPath))
  ? JSON.parse(fs.readFileSync(outputPath, 'utf-8'))
  : {};

const snapshots: Record<string, HeroSnapshots> = { ...existing };

const heroEntries = Object.entries(Heroes).filter(([heroId]) => !(heroId in existing));
const artifactEntries = Object.entries(Artifacts);

if (heroEntries.length === 0) {
  console.log(`No new heroes to add. Total heroes in snapshot: ${Object.keys(existing).length} → ${outputPath}`);
  process.exit(0);
}

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

fs.writeFileSync(outputPath, JSON.stringify(snapshots, null, 2));

const newHeroes = Object.keys(snapshots).filter(id => !(id in existing));
const newHeroCount = newHeroes.length;
const totalHeroCount = Object.keys(snapshots).length;
const newArtifactCount = newHeroes.reduce((n, id) => n + Object.keys(snapshots[id]).length, 0);
const newSkillCount = newHeroes.reduce((n, id) =>
  n + Object.values(snapshots[id]).reduce((m, a) => m + Object.keys(a).length, 0), 0);
console.log(`Added ${newHeroCount} new heroes (${newArtifactCount} hero×artifact combos, ${newSkillCount} skill variants). Total heroes in snapshot: ${totalHeroCount} → ${outputPath}`);
