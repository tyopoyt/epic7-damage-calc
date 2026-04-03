import { Hero } from 'src/app/models/hero';
import { DamageFormData } from 'src/app/models/forms';
import { Artifacts } from 'src/assets/data/artifacts';
import { Target } from 'src/app/models/target';
import { BehaviorSubject, Subject } from 'rxjs';

/**
 * Sets molagoras to maximum for each skill slot, matching the calculator's
 * page-load defaults. Must be called per-hero whenever the active hero changes.
 */
export function setMaxMolagoras(form: DamageFormData, hero: Hero): void {
  const maxForSlot = (slot: string) =>
    Math.max(0, ...Object.entries(hero.skills)
      .filter(([id]) => id[1] === slot)
      .map(([, skill]) => skill.enhance?.length ?? 0));

  form.molagoras1 = maxForSlot('1');
  form.molagoras2 = maxForSlot('2');
  form.molagoras3 = maxForSlot('3');
}

/**
 * Creates a minimal mock of DataService and LanguageService for use in
 * snapshot generation (generate-snapshots.ts) and regression tests
 * (damage.service.spec.ts). Using the same mock in both ensures consistency.
 */
export function createMockEnv(initialHero: Hero) {
  const currentHero = new BehaviorSubject<Hero>(initialHero);
  const currentArtifact = new BehaviorSubject(Artifacts.noProc);

  const dataService = {
    damageInputValues: new DamageFormData({}),
    damageInputChanged: new Subject<void>(),
    currentHero,
    currentArtifact,
    currentTarget: new Target(),
    attackModifiers: [
      'decreasedAttack', 'attackUp', 'attackUpGreat', 'casterVigor', 'casterEnraged',
      'casterHasStarsBlessing', 'casterHasPossession', 'casterHasArchdemonsMight',
      'casterPromotionStack', 'casterSpoilsStack', 'casterPilfered', 'casterHasDemonBladeUnleashed',
      'casterOverload', 'casterEnergyDepletion', 'casterHasGodOfBattle'
    ],
    damageMultSets: ['rageSet', 'torrentSet'],
    heroConstants: { beehooBurnMult: 1.3 }
  };

  const languageService = {
    getSkillModTip: () => '',
    translate: (_ns: string, key: string) => key
  };

  return { dataService, languageService };
}
