import { DamageService, DamageRow } from './damage.service';
import { createMockEnv, setMaxMolagoras } from 'src/testing/mock-damage-test-env';
import { Heroes } from 'src/assets/data/heroes';
import { Artifacts } from 'src/assets/data/artifacts';
import snapshots from 'src/testing/damage-snapshots.json';

describe('DamageService snapshot regression', () => {
  let service: DamageService;
  let env: ReturnType<typeof createMockEnv>;

  beforeAll(() => {
    env = createMockEnv(Object.values(Heroes)[0]);
    service = new DamageService(env.dataService as any, env.languageService as any);
  });

  for (const [heroId, heroSnapshots] of Object.entries(snapshots)) {
    for (const [artifactId, artifactSnapshots] of Object.entries(heroSnapshots)) {
      for (const [variantKey, expected] of Object.entries(artifactSnapshots)) {
        it(`${heroId} - ${artifactId} - ${variantKey}`, () => {
          const hero = Heroes[heroId];
          env.dataService.currentHero.next(hero);
          setMaxMolagoras(env.dataService.damageInputValues, hero);
          env.dataService.currentArtifact.next(Artifacts[artifactId]);

          const baseSkillId = variantKey.replace(/_soulburn$/, '').replace(/_extra$/, '');
          const isSoulburn = variantKey.endsWith('_soulburn');
          const isExtra = variantKey.endsWith('_extra');
          const baseSkill = hero.skills[baseSkillId];

          // Some heroes define a standalone soulburn/extra variant as a separate named
          // skill (e.g. abyssal_yufine's 's1_bis_soulburn'). Detect this by checking
          // whether the base skill actually supports the inferred variant type — if not,
          // use the full variantKey as a direct skill lookup with no variant flags.
          const isStandaloneVariant =
            (isSoulburn && !baseSkill?.soulburn && !!hero.skills[variantKey]) ||
            (isExtra    && !baseSkill?.canExtra  && !!hero.skills[variantKey]);

          if (isStandaloneVariant) {
            const skill = hero.skills[variantKey];
            expect(service.getDamage(skill, false, false, skill.isCounter)).toEqual(expected as DamageRow);
            return;
          }

          expect(service.getDamage(baseSkill, isSoulburn, isExtra, baseSkill.isCounter)).toEqual(expected as DamageRow);
        });
      }
    }
  }
});
