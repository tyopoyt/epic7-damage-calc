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