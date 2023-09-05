import { DataService } from "../services/data.service";
import { DoT, Skill } from "./skill";

import  * as _ from 'lodash'

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

    constructor(data: any, private dataService: DataService) {
        this.id = _.get(data, 'id', null);
        this.dot = _.get(data, 'dot', null);
        this.type = _.get(data, 'type', null);
        this.scale = _.get(data, 'scale', null);
        this.applies = _.get(data, 'applies', (skill: Skill) => false);
        this.value = _.get(data, 'value', () => 0); //TODO: add appropriate inputs to these fxns
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
}