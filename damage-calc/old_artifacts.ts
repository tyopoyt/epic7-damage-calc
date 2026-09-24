// sigurd_scythe_old: new Artifact({
//     id: 'sigurd_scythe',
//     name: 'Sigurd Scythe',
//     type: ArtifactDamageType.attack,
//     exclusive: HeroClass.warrior,
//     value: () => 0.25
//   }),
//     reingar_special_drink_old: new Artifact({
//       id: 'reingar_special_drink',
//       name: 'Reingar\'s Special Drink',
//       type: ArtifactDamageType.aftermath,
//       artifactSpecific:['targetDefenseDownAftermath'],
//       attackPercent: 0.3,
//       penetrate: 0.7,
//       exclusive: HeroClass.ranger,
//       applies: (skill: Skill, inputValues: DamageFormData, soulburn: boolean) => skill.isAOE(inputValues, soulburn)
//     }),
// tyrants_descent_old: new Artifact({
//     id: 'tyrants_descent',
//     name: "Tyrant's Descent",
//     artifactSpecific: ['targetNumberOfDebuffs'],
//     scale: [0.06, 0.66, 0.072, 0.078, 0.084, 0.09, 0.096, 0.102, 0.108, 0.114, 0.12],
//     // TODO: Check additional scaling, is max 24 total or 24 + scale
//     additional: [0.18, 0.186, 0.192, 0.198, 0.204, 0.21, 0.216, 0.222, 0.228, 0.234, 0.24],
//     type: ArtifactDamageType.damage,
//     exclusive: HeroClass.warrior,
//     value: (artiScale: number, inputValues: DamageFormData) => {
//       return artiScale + Math.min(inputValues.targetNumberOfDebuffs * 0.03, Artifacts.tyrants_descent.additional[Artifacts.tyrants_descent.scale.indexOf(artiScale)])
//     }
//   }),