import { BattleConstants } from "src/assets/data/constants";
import { Artifact } from "./artifact";
import { DamageFormData } from "./forms";
import { Skill } from "./skill";

export class Target {

    getDefense(inputValues: DamageFormData, globalDefMult: number) {
      const defMult = globalDefMult + inputValues.targetDefenseIncrease / 100;
      return inputValues.targetDefense * defMult;
    }
  
    getPenetration(skill: Skill, inputValues: DamageFormData, artifact: Artifact, soulburn: boolean, casterAttack: number, casterSpeed: number) {
      const base = skill.penetrate(soulburn, inputValues, artifact, casterAttack, casterSpeed);
      const artifactPenetration = artifact.getDefensePenetration(inputValues.artifactLevel, inputValues, skill);
      const set = (skill.isSingle(inputValues)) && inputValues.penetrationSet ? BattleConstants.penetrationSet : 0;
      const penResist = skill.id !== 'FixedPenetration' ? inputValues.penetrationResistance / 100 : 0;

      // Each source of penetration is mitigated by pen resist
      const totalPenetration = (1 - (base * (1 - penResist)))
                             * (1 - (set * (1 - penResist)))
                             * (1 - (artifactPenetration * (1 - penResist)))

      return Math.min(1, totalPenetration);
    }
  
    defensivePower(skill: Skill, inputValues: DamageFormData, globalDefMult: number, artifact: Artifact, soulburn: boolean, casterAttack: number, casterSpeed: number, noReduc = false) {
      const dmgReduc = noReduc ? 0 : inputValues.damageReduction / 100;
      const dmgTrans = skill.ignoreDamageTransfer(inputValues) ? 0 : inputValues.damageTransfer / 100;
      return ((1 - dmgReduc) * (1 - dmgTrans)) / (((this.getDefense(inputValues, globalDefMult) / 300) * this.getPenetration(skill, inputValues, artifact, soulburn, casterAttack, casterSpeed)) + 1);
    }
  }