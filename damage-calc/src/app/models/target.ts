import { DamageService } from "../services/damage.service";
import { DataService } from "../services/data.service";
import { Artifact } from "./artifact";
import { Skill } from "./skill";

export class Target {
    defense: number;
    casterArtifact: Artifact;

    //TODO: make this class not require any services
    constructor(casterArtifact: Artifact, private dataService: DataService, private damageService: DamageService) {
      const defMult = this.damageService.getGlobalDefMult() + this.dataService.damageInputValues.defensePercentUp / 100;
      this.defense = this.dataService.damageInputValues.targetDefense * defMult;
      this.casterArtifact = casterArtifact;
    }
  
    getPenetration(skill: Skill) {
      const base = skill && skill.penetration ? skill.penetration() : 0;
      const artifact = this.casterArtifact.getDefensePenetration(skill);
      const set = (skill.isSingle()) && this.dataService.damageInputValues.penSet ? this.dataService.battleConstants.penSet : 0;
  
      return Math.min(1, (1 - base) * (1 - set) * (1 - artifact));
    }
  
    defensivePower(skill: Skill, noReduc = false) {
      const dmgReduc = noReduc ? 0 : this.dataService.damageInputValues.damageReduction / 100;
      const dmgTrans = skill.ignoreDamageTransfer() ? 0 : this.dataService.damageInputValues.damageTransfer / 100;
      return ((1 - dmgReduc) * (1 - dmgTrans)) / (((this.defense / 300) * this.getPenetration(skill)) + 1);
    }
  }