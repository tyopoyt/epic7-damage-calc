import { DataService } from "../services/data.service";
import { DoT, Skill } from "./skill";

import  * as _ from 'lodash-es'

export enum ArtifactDamageType {
    damage = 'damage',
    penetrate = 'penetrate',
    aftermath = 'aftermath',
    attack = 'attack',
    critDmgBoost = 'crit-dmg-boost',
    flat = 'flat',
    dot = 'dot'

}

export class Artifact {
    id: string;
    dot: DoT[];
    type: ArtifactDamageType;
    applies: Function;
    value: Function;
    scale: number[];
    flat: Function;
    attackPercent: number;
    defensePercent: number;
    penetrate: number;

    //TODO: make this class not require any services
    constructor(data: any, private dataService: DataService) {
        this.id = _.get(data, 'id', null);
        this.dot = _.get(data, 'dot', null);
        this.type = _.get(data, 'type', null);
        this.scale = _.get(data, 'scale', null);
        this.applies = _.get(data, 'applies', (skill: Skill) => false);
        this.value = _.get(data, 'value', () => 0); //TODO: add appropriate inputs to these fxns
        this.flat = _.get(data, 'flat', () => 0);
        this.attackPercent = _.get(data, 'attackPercent', 0);
        this.defensePercent = _.get(data, 'defensePercent', 0);
        this.penetrate = _.get(data, 'penetrate', 0.7);
    }

    getDefensePenetration(skill: Skill): number {
        return (this.id && this.applies(skill) && this.type === ArtifactDamageType.penetrate) ? this.getValue() : 0;
    }

    getDoT(): DoT[] | null {
        return (this.id && this.type === ArtifactDamageType.dot) ? this.dot : null;
    }

    getValue(): number {
        return this.scale ? this.scale[Math.floor(this.dataService.damageInputValues.artifactLevel / 3)] : this.value();
    }

    getFlatMult() {
        if (this.type !== ArtifactDamageType.flat) {
            return 0;
        }
        return this.flat(this.getValue());
    }

    getDamageMultiplier(skill: Skill, isExtra: boolean) {
        if(!this.applies(skill)) return 0;
        if (this.id === undefined || this.type !== ArtifactDamageType.damage) {
          return 0;
        }
        //TODO: check if this needs to be refactored
        return typeof this.value === 'function' ? this.value(this.getValue(), skill, isExtra) : this.getValue();
    }

    getCritDmgBoost() {
        if (this.id === undefined || this.type !== ArtifactDamageType.critDmgBoost) {
          return 0;
        }
        //TODO: check if this needs to be refactored
        return this.value ? this.value(this.getValue()) : this.getValue();
    }

    getAttackBoost() {
        if (this.id === undefined || this.type !== ArtifactDamageType.attack) {
          return 0;
        }
        //TODO: check if this needs to be refactored
        return this.value ? this.value(this.getValue()) : this.getValue();
    }

    getAfterMathMultipliers(skill: Skill) {
        if(!this.applies(skill)) return null;
        if (this.id === undefined || this.type !== ArtifactDamageType.aftermath || (this.attackPercent === undefined && this.defensePercent === undefined) || this.penetrate === undefined) {
          return null;
        }
        return {
          atkPercent: this.attackPercent,
          defPercent: this.defensePercent,
          penetrate: this.penetrate
        };
      }
}