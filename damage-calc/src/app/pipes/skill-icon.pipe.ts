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
    const heroString = hero.replace('_old', '');

    let skillKey: string;
    const directBis = skill.match(/^(s[1-3]_bis)/);

    if (directBis) {
      skillKey = directBis[1];
    } else {
      const twoChar = skill.slice(0, 2);
      if (['s1', 's2', 's3'].includes(twoChar)) {
        skillKey = twoChar;
      } else {
        const heroObject = Heroes[heroString];
        const foundSkill = Object.entries(heroObject.skills)
          .find(([_, s]) => s.name === skill.replace(/_soulburn$|_extra$/, ''));
        const skillId = foundSkill?.[1].id ?? twoChar;
        const idBis = skillId.match(/^(s[1-3]_bis)/);
        skillKey = idBis ? idBis[1] : skillId.slice(0, 2);
      }
    }

    // Backward compat: if bis key has no dedicated icon entry, fall back to base slot
    const bisBase = skillKey.match(/^(s[1-3])_bis$/);
    if (bisBase && !SkillIDs[heroString]?.[skillKey]) {
      skillKey = bisBase[1];
    }

    return `${this.directory}${SkillIDs[heroString][skillKey]}.png`;
  }

}
