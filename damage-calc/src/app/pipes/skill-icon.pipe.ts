import { Pipe, PipeTransform } from '@angular/core';
import { SkillIDs } from 'src/assets/data/skill_ids';
import { Heroes } from 'src/assets/data/heroes';

@Pipe({
    name: 'skillIcon',
    standalone: false
})
export class SkillIconPipe implements PipeTransform {

  directory = 'assets/skills/';

  transform(skill: string, hero: string): string {
    let skillString: string = skill.slice(0,2);
    const heroString = hero.replace('_old', '')
    if (!(['s1', 's2', 's3'].includes(skillString))) {
      const heroObject = Heroes[heroString];
      skillString = Object.entries(heroObject.skills).filter(skillEntry => skillEntry[1].name === skill.replace('_soulburn', ''))[0][1].id.slice(0,2);
    }
    return `${this.directory}${SkillIDs[heroString][skillString]}.png`
  }

}
