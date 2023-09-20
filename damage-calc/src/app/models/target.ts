import { BattleConstants } from "src/assets/data/constants";
import { Artifact } from "./artifact";
import { DamageFormData } from "./forms";
import { Skill } from "./skill";

export class Target {
    defense: number;
    casterArtifact: Artifact;
    casterPenSet: boolean;
    damageReduction: number;
    damageTransfer: number;

    constructor(casterArtifact: Artifact, inputValues: DamageFormData, globalDefMult: number) {
      const defMult = globalDefMult + inputValues.defensePercentUp / 100;
      this.casterPenSet = inputValues.penSet;
      this.defense = inputValues.targetDefense * defMult;
      this.casterArtifact = casterArtifact;
      this.damageReduction = inputValues.damageReduction;
      this.damageTransfer = inputValues.damageTransfer;
    }
  
    getPenetration(skill: Skill) {
      const base = skill && skill.penetration ? skill.penetration() : 0;
      const artifact = this.casterArtifact.getDefensePenetration(skill);
      const set = (skill.isSingle()) && this.casterPenSet ? BattleConstants.penSet : 0;
  
      return Math.min(1, (1 - base) * (1 - set) * (1 - artifact));
    }
  
    defensivePower(skill: Skill, noReduc = false) {
      const dmgReduc = noReduc ? 0 : this.damageReduction / 100;
      const dmgTrans = skill.ignoreDamageTransfer() ? 0 : this.damageTransfer / 100;
      return ((1 - dmgReduc) * (1 - dmgTrans)) / (((this.defense / 300) * this.getPenetration(skill)) + 1);
    }
  }