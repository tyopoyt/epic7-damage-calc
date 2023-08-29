// set up vars for query params
formDefaults = {
  // come back and do the selectors (hero, arti, preset atk/cd, preset target, preset dmg reduce)
  'atk': 2500,
  'atkPcImprint': 0,
  'atkPcUp': 0,
  'crit': 250,
  'bonusDamage': 0,
  'torrentSetStack': 1,
  'def': 1000,
  'defPcUp': 0,
  'dmgReduc': 0,
  'dmgTrans': 0,
  'hero': 'abigail',
  'artifact': undefined,
  'atkPreset': undefined,
  'defPreset': undefined,
  'dmgReducPreset': 'none'
};

// list artifact first to avoid invalid arti selections
selectorParams = [
  'artifact', 'hero', 'atkPreset', 'defPreset', 'dmgReducPreset'
];
boolParams = [
  'elemAdv', 'atkDown', 'atkUp', 'atkUpGreat', 'critDmgUp', 'vigor', 'rageSet',
  'penSet', 'torrentSet', 'defUp', 'targetVigor', 'defDown', 'target'
];
numberParams = [
  'atk', 'atkPcImprint', 'atkPcUp', 'crit', 'bonusDamage', 'torrentSetStack', 'def',
  'defPcUp', 'dmgReduc', 'dmgTrans'
];
page = 'dmg_calc';

// regular inputs. This adds a lot of lines, but the dom only needs to be queried once for many inputs.
// might refactor this later cause it is a bit clunky...
// These vars are used as globals
/* eslint-disable no-unused-vars */
const atkInput = document.getElementById('atk');
const atkPcImprintInput = document.getElementById('atk-pc-imprint');
const atkPcUpInput = document.getElementById('atk-pc-up');
const critInput = document.getElementById('crit');
const bonusDamageInput = document.getElementById('bonus-damage');
const elemAdvInput = document.getElementById('elem-adv');
const atkDownInput = document.getElementById('atk-down');
const atkUpInput = document.getElementById('atk-up');
const atkUpGreatInput = document.getElementById('atk-up-great');
const critDmgUpInput = document.getElementById('crit-dmg-up');
const vigorInput = document.getElementById('vigor');
const rageSetInput = document.getElementById('rage-set');
const penSetInput = document.getElementById('pen-set');
const torrentSetInput = document.getElementById('torrent-set');
let torrentSetStackInput = document.getElementById('torrent-set-stack');
const defInput = document.getElementById('def');
const defPcUpInput = document.getElementById('def-pc-up');
const dmgReducInput = document.getElementById('dmg-reduc');
const dmgTransInput = document.getElementById('dmg-trans');
const defUpInput = document.getElementById('def-up');
const targetVigorInput = document.getElementById('target-vigor');
const defDownInput = document.getElementById('def-down');
const targetInput = document.getElementById('target');
const heroSelector = document.getElementById('hero');
const artifactSelector = document.getElementById('artifact');
const atkPresetSelector = document.getElementById('atk-preset');
const defPresetSelector = document.getElementById('def-preset');
const dmgReducPresetSelector = document.getElementById('dmg-reduc-preset');

// slides
const atkSlide = document.getElementById('atk-slide');
const atkPcImprintSlide = document.getElementById('atk-pc-imprint-slide');
const atkPcUpSlide = document.getElementById('atk-pc-up-slide');
const critSlide = document.getElementById('crit-slide');
const bonusDamageSlide = document.getElementById('bonus-damage-slide');
let torrentSetStackSlide = document.getElementById('torrent-set-stack-slide');
const defSlide = document.getElementById('def-slide');
const defPcUpSlide = document.getElementById('def-pc-up-slide');
const dmgReducSlide = document.getElementById('dmg-reduc-slide');
const dmgTransSlide = document.getElementById('dmg-trans-slide');
/* eslint-enable */

// declare inputValues up here since it'll be used in multiple places
let inputValues;

const dmgConst = 1.871;
const hitTypes = {
  crit: 'crit',
  crush: 'crush',
  normal: 'normal',
  miss: 'miss',
};
const skillTypes = {
  single: 'single',
  aoe: 'aoe',
};
let setForms = [];

const getSkillType = (skill) => {
  if (skill.single !== undefined && ((typeof skill.single === 'function') ? skill.single() : skill.single) === true) return skillTypes.single;
  if (skill.aoe !== undefined && ((typeof skill.aoe === 'function') ? skill.aoe() : skill.aoe) === true) return skillTypes.aoe;
  return undefined;
};

const stackingSets = ['torrent-set'];
const manageSetForms = () => {
  setForms = [];
  for (const set of stackingSets) {
    const elem = document.getElementById(set);
    if (elem.checked) {
      setForms.push(elements[`${set.replace('-', '_')}_stack`]);
    }
  }

  const setNumHolder = document.getElementById('set-num-holder');
  if (setForms.length) {
    const lang = document.getElementById('root').getAttribute('lang');
    let setLabel = 'Number of Sets';
    if (lang !== 'en') {
      setLabel = i18n[lang].form.nb_sets || 'Number of Sets';
    }
    setNumHolder.style.display = 'block';
    setNumHolder.innerHTML = `<h4>${setLabel}</h4>
                              <div id="set-num-block"></div>
                              <hr />`;
    const numSetsBlock = document.getElementById('set-num-block');
    numSetsBlock.innerHTML = '';
    for (let elem of setForms) {
      buildElement(elem, numSetsBlock);
    }
    
    // fetch all set stack inputs here
    torrentSetStackInput = document.getElementById('torrent-set-stack');
    torrentSetStackSlide = document.getElementById('torrent-set-stack-slide');
  } else {
    setNumHolder.style.display = 'none';
  }
};

/* eslint-disable no-unused-vars */
const torrentSetToggled = () => {
  window.dataLayer.push({
    'event': 'toggle_torrent_set',
    'torrent_set': torrentSetInput.checked ? 'on' : 'off'
  });

  // reset value when toggling torrent set off
  if (!torrentSetInput.checked) {
    torrentSetStackInput.value = formDefaults.torrentSetStack;
  }
  manageSetForms();
};

const resolve = () => {
  if (loadingQueryParams) {
    return; // don't resolve until params are loaded
  }

  inputValues = getInputValues(true);
  const artifact = new Artifact(inputValues.artifact);
  const hero = new Hero(inputValues.hero, artifact);

  document.getElementById('barrier-block').style.display = 'none';
  document.getElementById('artifact-dmg-block').style.display = 'none';
  for (const dotType of [dot.bleed, dot.burn, dot.bomb]) {
    document.getElementById(`${dotType}-damage-block`).style.display = 'none';
  }

  for (const dotType of hero.dot || []) {
    document.getElementById(`${dotType}-damage-block`).style.display = 'inline-block';
    document.getElementById(`${dotType}-damage`).innerText = Math.round(hero.getDotDamage(dotType)).toString();
  }

  if (hero.barrier) {
    document.getElementById('barrier-block').style.display = 'inline-block';
    barrierText = Math.round(hero.getBarrierStrength()).toString();

    if (hero.barrier2) {
      document.getElementById('barrier').innerText = `${hero.barrierSkills[0]}: ${barrierText} / ${hero.barrierSkills[1]}: ${Math.round(hero.getBarrier2Strength()).toString()}`;
    } else {
      document.getElementById('barrier').innerText = barrierText;
    }
  }

  const artiDmg = hero.getAfterMathArtifactDamage();
  if (artiDmg != null) {
    document.getElementById('artifact-dmg-block').style.display = 'inline-block';
    document.getElementById('artifact-dmg').innerText = Math.round(artiDmg).toString();
  }

  const table = document.getElementById('damage');
  table.innerHTML = '';
  for (const skillId of Object.keys(hero.skills)) {
    const skill = hero.skills[skillId];

    if (skill.rate !== undefined) {
      const damage = hero.getDamage(skillId);
      $(table).append(`<tr>
            <td>
              ${skill.name ? skill.name : skillLabel(skillId)}
              <a tabindex="0" class="btn btn-xs btn-light p-1 float-right" data-toggle="popover" title="${skillLabel('mods')}" data-content='${getModTooltip(hero, skillId)}' data-html="true" data-placement="top">
                <i class="fas fa-square-root-alt fa-sm"></i>
              </a>
            </td>
            <td>${displayDmg(damage, 'crit')}</td>
            <td>${displayDmg(damage, 'crush')}</td>
            <td>${displayDmg(damage, 'normal')}</td>
            <td>${displayDmg(damage, 'miss')}</td>
      </tr>`);

      if (skill.soulburn) {
        const damage = hero.getDamage(skillId, true);
        $(table).append(`<tr>
            <td>
              ${skill.name ? skill.name : skillLabel(skillId, true)}
              <a tabindex="0" class="btn btn-xs btn-light p-1 float-right" data-toggle="popover" title="${skillLabel('mods')}" data-content='${getModTooltip(hero, skillId, true)}' data-html="true" data-placement="top">
                <i class="fas fa-square-root-alt fa-sm"></i>
              </a>
            </td>
            <td>${displayDmg(damage, 'crit')}</td>
            <td>${displayDmg(damage, 'crush')}</td>
            <td>${displayDmg(damage, 'normal')}</td>
            <td>${displayDmg(damage, 'miss')}</td>
        </tr>`);
      }

      if (skill.canExtra && artifacts[inputValues.artifact].extraAttack) {
        const damage = hero.getDamage(skillId, true, true);
        $(table).append(`<tr>
            <td>
              ${skill.name ? skill.name : skillLabel(skillId, false, true)}
              <a tabindex="0" class="btn btn-xs btn-light p-1 float-right" data-toggle="popover" title="${skillLabel('mods')}" data-content='${getModTooltip(hero, skillId, true)}' data-html="true" data-placement="top">
                <i class="fas fa-square-root-alt fa-sm"></i>
              </a>
            </td>
            <td>${displayDmg(damage, 'crit')}</td>
            <td>${displayDmg(damage, 'crush')}</td>
            <td>${displayDmg(damage, 'normal')}</td>
            <td>${displayDmg(damage, 'miss')}</td>
        </tr>`);
      }
    }
  }

  formUpdated(true);
  if (document.getElementById('damage-chart-container').style.display !== 'none') {
    calculateChart(inputValues);
  }
};
/* eslint-enable */

const displayDmg = (damage, type) => {
  return damage[type] !== null ? damage[type] : `<i>${skillLabel('non_applicable')}</i>`;
};

const getModTooltip = (hero, skillId, soulburn = false) => {
  const values = hero.getModifiers(skillId, soulburn, hero);
  let content = `${skillLabel('att_rate')}: <b class="float-right">${values.rate}</b><br/>
                 ${skillLabel('power')}: <b class="float-right">${values.pow}</b><br/>`;

  if (values.mult !== null) {
    content += `${skillLabel('mult')}: <span class="float-right">${values.multTip} <b>${Math.round(values.mult * 100)}%</b></span><br/>`;
  }
  if (values.flat !== null) {
    content += `${skillLabel('flat')}: <span class="float-right">${values.flatTip} <b>${Math.round(values.flat)}</b></span><br/>`;
  }
  if (values.critBoost !== null) {
    content += `${skillLabel('critBoost')}: <span class="float-right">${values.critBoostTip} <b>+${Math.round(values.critBoost * 100)}%</b></span><br/>`;
  }
  if (values.pen != null) content += `${skillLabel('pen')}: <span class="float-right">${values.penTip} <b>${Math.round(values.pen * 100)}%</b></span><br/>`;
  if (values.detonation != null) content += `${skillLabel('detonation')}: <b class="float-right">+${Math.round(values.detonation * 100)}%</b><br/>`;
  if (values.exEq != null) content += `${skillLabel('exEq')}: <b class="float-right">+${Math.round(values.exEq * 100)}%</b><br/>`;
  if (values.elemAdv !== null) content += `${skillLabel('elemAdv')}: <i class="fas ${values.elemAdv ? 'fa-check-square' : 'fa-times-circle'} float-right"></i><br/>`;
  if (values.afterMathFormula !== null) content += `${skillLabel('afterMathFormula')}/${values.afterMathFormula.defPercent ? skillLabel('def_rate') : values.afterMathFormula.injuryPercent ? skillLabel('injury_rate') : skillLabel('att_rate')}: <b class="float-right">${Math.round((values.afterMathFormula.atkPercent || values.afterMathFormula.defPercent || values.afterMathFormula.injuryPercent) * 100)}%</b><br/>`;
  if (values.afterMathFormula !== null) content += `${skillLabel('afterMathFormula')}/${skillLabel('pen')}: <b class="float-right">${Math.round(values.afterMathFormula.penetrate * 100)}%</b><br/>`;
  if (values.afterMathDmg !== null) content += `${skillLabel('afterMathDmg')}: <b class="float-right">${Math.round(values.afterMathDmg)}</b><br/>`;
  if (values.extraDmg != null) content += `${skillLabel('extraDmg')}: <span class="float-right">${values.extraDmgTip} <b>${Math.round(values.extraDmg)}</b><br/>`;
  if (values.fixed != null) content += `${skillLabel('fixed')}: <span class="float-right">${values.fixedTip ?? ''} <b>${Math.round(values.fixed)}</b><br/>`;
  return content;
};

const attackMods = ['atkDown', 'atkUp', 'atkUpGreat', 'vigor'];
const getGlobalAtkMult = () => {
  let mult = 0.0;

  attackMods.forEach((mod) => {
    mult += inputValues[mod] ? battleConstants[mod] - 1 : 0.0;
  });

  if (elements.caster_enrage.value()) {
    mult += 0.1;
  }

  return mult + (inputValues.atkPcUp / 100);
};

const damageMultSets = ['rageSet', 'torrentSet'];
const getGlobalDamageMult = (hero, skill) => {
  let mult = 0.0;

  damageMultSets.forEach((set) => {
    mult += inputValues[set] ? battleConstants[set] * (inputValues[`${set}Stack`] || 1) : 0.0;
  });

  const selected = defPresetSelector.options[defPresetSelector.selectedIndex];
  if (hero.element === selected.dataset.elemExtraDmg) {
    mult += parseFloat(selected.dataset.extraDmgPc) - 1;
  }

  if (getSkillType(skill) === skillTypes.single && selected.dataset.singleAtkMult) {
    mult += parseFloat(selected.dataset.singleAtkMult) - 1;
  }
  if (getSkillType(skill) !== skillTypes.single && selected.dataset.nonSingleAtkMult) {
    mult += parseFloat(selected.dataset.nonSingleAtkMult) - 1;
  }

  return mult;
};

const getGlobalDefMult = () => {
  let mult = 1.0;

  for (let defMod of ['defUp', 'defDown', 'targetVigor']) {
    mult += inputValues[defMod] ? battleConstants[defMod] : 0.0;
  }

  return mult;
};

/* eslint-disable no-unused-vars */
let currentHero = null;
/* eslint-enable */

class Hero {
  constructor(id, artifact) {
    this.id = id;
    this.atk = inputValues.atk;
    this.crit = inputValues.crit;
    this.bonus = inputValues.bonusDamage;
    this.skills = heroes[id].skills;
    this.baseAtk = heroes[id].baseAtk || 0;
    this.baseDef = heroes[id].baseDef || 0;
    this.baseHP = heroes[id].baseHP || 0;
    this.dot = [...(heroes[id].dot || []), ...(artifact?.getDoT() || [])];
    this.atkUp = heroes[id].atkUp;
    this.innateAtkUp = heroes[id].innateAtkUp;
    this.element = heroes[id].element;
    this.barrierSkills = heroes[id].barrierSkills;
    this.barrier = heroes[id].barrier;
    this.barrier2 = heroes[id].barrier2;
    this.barrierEnhance = heroes[id].barrierEnhance;
    this.artifact = artifact;
    this.target = new Target(artifact);

    currentHero = this;
  }

  getModifiers(skillId, soulburn = false) {
    const skill = this.skills[skillId];
    return {
      rate: (typeof skill.rate === 'function') ? skill.rate(soulburn) : skill.rate,
      pow: (typeof skill.pow === 'function') ? skill.pow(soulburn) : skill.pow,
      mult: skill.mult ? skill.mult(soulburn, this) - 1 : null,
      multTip: skill.multTip !== undefined ? getSkillModTip(skill.multTip(soulburn)) : '',
      flat: skill.flat ? skill.flat(soulburn, this) : null,
      flatTip: skill.flatTip !== undefined ? getSkillModTip(skill.flatTip(soulburn)) : '',
      critBoost: skill.critDmgBoost ? skill.critDmgBoost(soulburn) : null,
      critBoostTip: skill.critDmgBoostTip ? getSkillModTip(skill.critDmgBoostTip(soulburn)) : '',
      pen: skill.penetrate ? skill.penetrate() : null,
      penTip: skill.penetrateTip !== undefined ? getSkillModTip(skill.penetrateTip(soulburn)) : '',
      detonation: skill.detonation !== undefined ? skill.detonation() - 1 : null,
      exEq: skill.exEq !== undefined ? skill.exEq() : null,
      elemAdv: (typeof skill.elemAdv === 'function') ? skill.elemAdv() : null,
      afterMathFormula: skill.afterMath !== undefined ? skill.afterMath(soulburn) : null,
      afterMathDmg: skill.afterMath !== undefined ? this.getAfterMathSkillDamage(skillId, hitTypes.crit) : null,
      extraDmg: skill.extraDmg !== undefined ? skill.extraDmg() : null,
      extraDmgTip: skill.extraDmgTip !== undefined ? getSkillModTip(skill.extraDmgTip(soulburn)) : '',
      fixed: skill.fixed !== undefined ? skill.fixed(hitTypes.crit) : null,
      fixedTip: skill.fixedTip !== undefined ? getSkillModTip(skill.fixedTip()) : null,
    };
  }

  getDamage(skillId, soulburn = false, isExtra = false) {
    const critDmgBuff = inputValues.critDmgUp ? battleConstants.critDmgUp : 0.0;

    const skill = this.skills[skillId];
    const hit = this.offensivePower(skillId, soulburn, isExtra, this) * this.target.defensivePower(skill);
    const critDmg = Math.min((this.crit / 100) + critDmgBuff, 3.5)
        + (skill.critDmgBoost ? skill.critDmgBoost(soulburn) : 0)
        + (this.artifact.getCritDmgBoost() || 0)
        + (elements.caster_perception.value() ? 0.15 : 0);
    return {
      crit: skill.noCrit || skill.onlyMiss ? null : Math.round(hit * critDmg + (skill.fixed !== undefined ? skill.fixed(hitTypes.crit) : 0) + this.getAfterMathDamage(skillId, hitTypes.crit)),
      crush: skill.noCrit || skill.onlyCrit || skill.onlyMiss ? null : Math.round(hit * 1.3 + (skill.fixed !== undefined ? skill.fixed(hitTypes.crush) : 0) + this.getAfterMathDamage(skillId, hitTypes.crush)),
      normal: skill.onlyCrit || skill.onlyMiss ? null : Math.round(hit + (skill.fixed !== undefined ? skill.fixed(hitTypes.normal) : 0) + this.getAfterMathDamage(skillId, hitTypes.normal)),
      miss: skill.noMiss ? null : Math.round(hit * 0.75 + (skill.fixed !== undefined ? skill.fixed(hitTypes.miss) : 0) + this.getAfterMathDamage(skillId, hitTypes.miss))
    };
  }

  getAtk(skillId) {
    const skill = skillId !== undefined ? this.skills[skillId] : undefined;

    let atk = (skill !== undefined && skill.atk !== undefined) ? skill.atk() : this.atk;

    if (this.innateAtkUp !== undefined) {
      atk = atk / (1 + this.innateAtkUp());
    }

    let atkImprint = 0;
    let atkMod = 1;
    if (skill === undefined || skill.noBuff !== true) {
      atkImprint = this.baseAtk * (inputValues.atkPcImprint / 100);
      atkMod = 1
          + getGlobalAtkMult()
          + (this.atkUp !== undefined ? this.atkUp() - 1 : 0)
          + (this.innateAtkUp !== undefined ? this.innateAtkUp() : 0)
          + this.artifact.getAttackBoost();
    }

    return (atk + atkImprint) * atkMod;
  }

  getDef() {
    if (this.def) {
      return this.def * (1 + (elements.caster_defense_up.value() ? battleConstants.defUp : 0)
           + (document.getElementById('vigor').checked ? battleConstants.vigor - 1 : 0)
           + (document.getElementById('caster-fury')?.checked ? battleConstants['caster-fury'] - 1 : 0));
    }
    return elements.caster_defense.value();
  }

  getHP() {
    return this.hp || elements.caster_max_hp.value();
  }

  getSpd() {
    if (this.spd) {
      return Math.floor(this.spd) * (1 + (elements.caster_speed_up.value() ? battleConstants.spdUp - 1 : 0)
           + (document.getElementById('caster-enrage')?.checked ? battleConstants['casterRage'] - 1 : 0));
    }
    return elements.caster_speed.value();
  }

  offensivePower(skillId, soulburn, isExtra, hero) {
    const skill = this.skills[skillId];

    const rate = (typeof skill.rate === 'function') ? skill.rate(soulburn) : skill.rate;
    const flatMod = skill.flat ? skill.flat(soulburn, hero) : 0;
    const flatMod2 = this.artifact.getFlatMult() + (skill.flat2 !== undefined ? skill.flat2() : 0);

    const pow = (typeof skill.pow === 'function') ? skill.pow(soulburn) : skill.pow;
    const skillEnhance = this.getSkillEnhanceMult(skillId);
    let elemAdv = 1.0;
    if (inputValues.elemAdv || (typeof skill.elemAdv === 'function') && skill.elemAdv() === true) {
      elemAdv = battleConstants.elemAdv;
    }
    const target = inputValues.target ? battleConstants.target : 1.0;

    let dmgMod = 1.0
        + getGlobalDamageMult(this, skill)
        + this.bonus / 100
        + this.artifact.getDamageMultiplier(skill, skillId, isExtra)
        + (skill.mult ? skill.mult(soulburn, this) - 1 : 0);

    return ((this.getAtk(skillId) * rate + flatMod) * dmgConst + flatMod2) * pow * skillEnhance * elemAdv * target * dmgMod;
  }

  getSkillEnhanceMult(skillId) {
    const skill = this.skills[skillId];
    let mult = 1.0;

    let enhancementSkillId = skillId;
    let enhancement = skill.enhance;

    if (!enhancement && skill.enhance_from) {
      enhancementSkillId = skill.enhance_from;
      enhancement = this.skills[skill.enhance_from].enhance;
    }

    if (enhancement) {
      const enhanceLevel = Number(document.getElementById(`molagora-${enhancementSkillId}`).value);
      for (let i = 0; i < enhanceLevel; i++) {
        mult += enhancement[i];
      }
    }

    if (skill.exEq !== undefined) {
      mult += skill.exEq();
    }

    return mult;
  }

  getAfterMathDamage(skillId, hitType) {
    const skill = this.skills[skillId];
    const detonation = this.getDetonateDamage(skillId);

    let artiDamage = this.getAfterMathArtifactDamage(skillId);
    if (artiDamage === null) {
      artiDamage = 0;
    }


    const skillDamage = this.getAfterMathSkillDamage(skillId, hitType);
    const skillExtraDmg = skill.extraDmg !== undefined ? Math.round(skill.extraDmg(hitType)) : 0;

    return detonation + artiDamage + skillDamage + skillExtraDmg;
  }

  getAfterMathSkillDamage(skillId, hitType) {
    const skill = this.skills[skillId];

    let skillDamage = 0;
    const skillMultipliers = skill.afterMath ? skill.afterMath(hitType) : null;
    if (skillMultipliers !== null) {
      if (skillMultipliers.atkPercent) {
        skillDamage = this.getAtk(skillId) * skillMultipliers.atkPercent * dmgConst * this.target.defensivePower({ penetrate: () => skillMultipliers.penetrate }, true);
      } else if (skillMultipliers.defPercent) {
        skillDamage = elements.caster_defense.value() * skillMultipliers.defPercent * dmgConst * this.target.defensivePower({ penetrate: () => skillMultipliers.penetrate }, true);
      } else if (skillMultipliers.injuryPercent) {
        skillDamage = elements.target_injuries.value() * skillMultipliers.injuryPercent * dmgConst * this.target.defensivePower({ penetrate: () => skillMultipliers.penetrate }, true);
      }
    }

    return skillDamage;
  }

  getAfterMathArtifactDamage(skillId) {
    const skill = this.skills[skillId];

    const artiMultipliers = this.artifact.getAfterMathMultipliers(skill, skillId);
    if (artiMultipliers !== null) {
      if (artiMultipliers.atkPercent) {
        return this.getAtk() * artiMultipliers.atkPercent * dmgConst * this.target.defensivePower({ penetrate: () => artiMultipliers.penetrate }, true);
      } else if (artiMultipliers.defPercent) {
        return elements.caster_defense.value() * artiMultipliers.defPercent * dmgConst * this.target.defensivePower({ penetrate: () => artiMultipliers.penetrate }, true);
      }
    }

    return null;
  }

  getDetonateDamage(skillId) {
    const skill = this.skills[skillId];

    const dotTypes = Array.isArray(skill.detonate) ? skill.detonate : [skill.detonate];
    let damage = 0;

    if (dotTypes.includes(dot.bleed)) damage += elements.target_bleed_detonate.value() * skill.detonation() * this.getDotDamage(dot.bleed);
    if (dotTypes.includes(dot.burn)) damage += elements.target_burn_detonate.value() * skill.detonation() * this.getDotDamage(dot.burn);
    if (dotTypes.includes(dot.bomb)) damage += elements.target_bomb_detonate.value() * skill.detonation() * this.getDotDamage(dot.bomb);

    return damage;
  }

  getDotDamage(type) {
    switch (type) {
    case dot.bleed:
      return this.getAtk() * 0.3 * dmgConst * this.target.defensivePower({ penetrate: () => 0.7 }, true);
    case dot.burn:
      return this.getAtk() * 0.6 * dmgConst * (elements.beehoo_passive.value() ? heroConstants.beehooBurnMult : 1) * this.target.defensivePower({ penetrate: () => 0.7 }, true);
    case dot.bomb:
      return this.getAtk() * 1.5 * dmgConst * this.target.defensivePower({ penetrate: () => 0.7 }, true);
    default: return 0;
    }
  }

  getBarrierStrength() {
    return this.barrier(this) * (this.barrierEnhance ? this.getSkillEnhanceMult(this.barrierEnhance) : 1);
  }

  getBarrier2Strength() {
    // For now only Roana needs this and her barrier does not scale with enhances
    return this.barrier2(this); // *(this.barrier2Enhance ? this.getSkillEnhanceMult(this.barrier2Enhance) : 1);
  }
}

class Target {
  constructor(casterArtifact) {
    const defMult = getGlobalDefMult() + inputValues.defPcUp / 100;
    this.def = inputValues.def * defMult;
    this.casterArtifact = casterArtifact;
  }

  getPenetration(skill) {
    const base = skill && skill.penetrate ? skill.penetrate() : 0;
    const artifact = this.casterArtifact.getDefensePenetration(skill);
    const set = (getSkillType(skill) === skillTypes.single) && inputValues['penSet'] ? battleConstants.penSet : 0;

    return Math.min(1, (1 - base) * (1 - set) * (1 - artifact));
  }

  defensivePower(skill, noReduc = false) {
    const dmgReduc = noReduc ? 0 : inputValues['dmgReduc'] / 100;
    const dmgTrans = skill.noTrans === true ? 0 : inputValues.dmgTrans / 100;
    return ((1 - dmgReduc) * (1 - dmgTrans)) / (((this.def / 300) * this.getPenetration(skill)) + 1);
  }
}

/* eslint-disable no-unused-vars */
let currentArtifact = null;
/* eslint-denable */
class Artifact {
  constructor(id) {
    this.id = id ? id : undefined;
    if (id) {
      this.defenseScaling = artifacts[this.id]['defenseScaling'];
      this.hpScaling = artifacts[this.id]['hpScaling'];
      this.spdScaling = artifacts[this.id]['spdScaling'];
    }
    currentArtifact = this;
  }

  applies(skill, skillId = undefined) {
    if (this.id === undefined || skill === undefined) return true;
    return artifacts[this.id].applies !== undefined ? artifacts[this.id].applies(skill, skillId) : true;
  }

  getName() {
    return artifactName(this.id);
  }

  getValue() {
    return artifacts[this.id].scale
      ? artifacts[this.id].scale[Math.floor(document.getElementById('artifact-lvl').value / 3)]
      : artifacts[this.id].value;
  }

  getDamageMultiplier(skill, skillId, isExtra) {
    if(!this.applies(skill, skillId)) return 0;
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.damage) {
      return 0;
    }
    return typeof artifacts[this.id].value === 'function' ? artifacts[this.id].value(this.getValue(), skill, isExtra) : this.getValue();
  }

  getDefensePenetration(skill) {
    if(!this.applies(skill)) return 0;
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.penetrate) {
      return 0;
    }
    return this.getValue();
  }

  getAfterMathMultipliers(skill, skillId) {
    if(!this.applies(skill, skillId)) return null;
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.aftermath || (artifacts[this.id].atkPercent === undefined && artifacts[this.id].defPercent === undefined) || artifacts[this.id].penetrate === undefined) {
      return null;
    }
    return {
      atkPercent: artifacts[this.id].atkPercent,
      defPercent: artifacts[this.id].defPercent,
      penetrate: artifacts[this.id].penetrate,
    };
  }

  getAttackBoost() {
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.attack) {
      return 0;
    }
    return artifacts[this.id].value ? artifacts[this.id].value(this.getValue()) : this.getValue();
  }

  getCritDmgBoost() {
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.critDmgBoost) {
      return 0;
    }
    return artifacts[this.id].value ? artifacts[this.id].value(this.getValue()) : this.getValue();
  }

  getFlatMult() {
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.flat) {
      return 0;
    }
    return artifacts[this.id].flat(this.getValue());
  }

  getDoT() {
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.dot) {
      return null;
    }
    
    return artifacts[this.id].dot;
  }
}

// Charting
const pointBackgrounds = ['rgba(23, 119, 212, 0.75)', 'rgba(212, 55, 88,0.75)', 'rgba(199, 129, 16, 0.75)', 'rgba(28, 145, 106, 0.75)', 'rgba(83, 62, 176, 0.75)'];
const pointOutlines = ['#36a2eb', '#ff6384', '#fcaf32', '#08c988', '#7059d4'];
const pointStyles = ['circle', 'triangle', 'rect', 'rectRot', 'star'];

const ctx = document.getElementById('damage-chart');
const chartDefaults = {
  type: 'line',
  data: {
    labels: [],
    datasets: []
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false
      },
      x: {
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (item) =>
            `${formLabel('with_more')} ${item.dataset.label}: ${item.formattedValue} ${formLabel('damage')}`,
        },
      },
      annotation: {
        annotations: {
          currentLine: {
            type: 'line',
            xMin: 40,
            xMax: 40,
            borderColor: 'rgba(25, 25, 25, 0.75)',
            borderWidth: 2,
            label: {
              display: true,
              content: formLabel('current_stats'),
              position: 'start',
              backgroundColor: 'rgba(25, 25, 25, 0.75)',
              font: {
                family: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
              }
            }
          }
        }
      }
    }
  }
};
let chart = new Chart(ctx, chartDefaults);

const toggleChart = () => {
  const chartContainer = document.getElementById('damage-chart-container');
  const lang = document.getElementById('root').getAttribute('lang');
  chartButton = document.getElementById('chart-button-text');

  if (chartContainer.style.display == 'none') {
    window.dataLayer.push({
      'event': 'show_chart',
      'hero': inputValues['hero']
    });
    calculateChart(inputValues);
    chartContainer.style.display = 'block';
    if (lang === 'en') {
      chartButton.innerText = 'Hide Graph';
    } else {
      chartButton.innerText = i18n[lang].form.hide_chart || 'Hide Graph';
    }
  } else {
    chartContainer.style.display = 'none';
    if (lang === 'en') {
      chartButton.innerText = 'Show Graph';
    } else {
      chartButton.innerText = i18n[lang].form.show_chart || 'Show Graph';
    }
  }
};

// TODO: Handle soulburn damage
const calculateChart = (inputValues) => {
  const artifact = new Artifact(inputValues.artifact);
  const hero = new Hero(inputValues.hero, artifact);
  const skillSelect = document.getElementById('chart-skill');
  let selected = skillSelect.options[skillSelect.selectedIndex]?.value || 's1';

  const soulburn = selected.endsWith('_soulburn');
  if (soulburn) {
    selected = selected.slice(0, -9);
  }
  const skill = heroes[hero.id].skills[selected];

  if (!skill) {
    return;
  }

  const damageToUse = skill.onlyMiss ? 'miss' : (!skill?.noCrit ? 'crit' : 'normal');
  chart.data.labels = [];

  // pick different num steps if skill.nocrit
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const intersectionRatio = 3; // denominator of fraction, so 3 = intersection 1/3 from the left of chart
  const numSteps = windowWidth < 768 ? 50 : 120;
  const intersectionPoint = numSteps / intersectionRatio;
  chart.config.options.plugins.annotation.annotations.currentLine.xMin = intersectionPoint;
  chart.config.options.plugins.annotation.annotations.currentLine.xMax = intersectionPoint;

  let filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('attack'));
  if (!skill.rate && filteredDatasets.length && !artifact.atkPercent) {
    chart.data.datasets.splice(chart.data.datasets.indexOf(filteredDatasets[0]), 1);
  }

  filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('cdam'));
  if (damageToUse !== 'crit' && filteredDatasets.length) {
    chart.data.datasets.splice(chart.data.datasets.indexOf(filteredDatasets[0]), 1);
  }

  filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('defense'));
  if (!skill.defenseScaling && filteredDatasets.length && !artifact.defenseScaling) {
    chart.data.datasets.splice(chart.data.datasets.indexOf(filteredDatasets[0]), 1);
  }

  filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('hp'));
  if (!skill.hpScaling && filteredDatasets.length && !artifact.hpScaling) {
    chart.data.datasets.splice(chart.data.datasets.indexOf(filteredDatasets[0]), 1);
  }

  filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('speed'));
  if (!skill.spdScaling && filteredDatasets.length && !artifact.spdScaling) {
    chart.data.datasets.splice(chart.data.datasets.indexOf(filteredDatasets[0]), 1);
  }

  if (skill.rate) {
    const atkStep = Math.max(Math.floor(((8 / 7) / 100) * hero.baseAtk), 1);

    filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('attack'));
    if (!filteredDatasets.length) {
      chart.data.datasets.push({
        label: formLabel('attack'),
        data: [],
        borderWidth: 1,
        backgroundColor: pointBackgrounds[chart.data.datasets.length],
        borderColor: pointOutlines[chart.data.datasets.length],
        pointStyle: pointStyles[chart.data.datasets.length]
      });
      filteredDatasets.push(chart.data.datasets[chart.data.datasets.length - 1]);
    } else {
      const indexOfDataset = chart.data.datasets.indexOf(filteredDatasets[0]);
      chart.data.datasets[indexOfDataset].backgroundColor = pointBackgrounds[indexOfDataset];
      chart.data.datasets[indexOfDataset].borderColor = pointOutlines[indexOfDataset];
      chart.data.datasets[indexOfDataset].pointStyle = pointStyles[indexOfDataset];
    }

    const atkDataIndex = chart.data.datasets.indexOf(filteredDatasets[0]);

    hero.atk = hero.atk - (intersectionPoint * atkStep);
    chart.data.datasets[atkDataIndex].data = [];

    while (chart.data.datasets[atkDataIndex].data.length < numSteps) {
      const damage = hero.getDamage(selected, soulburn);
      const finalDam = displayDmg(damage, damageToUse);
  
      chart.data.datasets[atkDataIndex].data.push(finalDam);
      chart.data.labels.push(`${hero.atk} ${formLabel('attack')}`);
      hero.atk += atkStep; // TODO: deal with innate attack up?
    
    }
    hero.crit = hero.crit - intersectionPoint;
    hero.atk = inputValues.atk;
  }

  if (damageToUse === 'crit') {
    filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('cdam'));
    if (!filteredDatasets.length) {
      chart.data.datasets.push({
        label: formLabel('cdam'),
        data: [],
        borderWidth: 1,
        backgroundColor: pointBackgrounds[chart.data.datasets.length],
        borderColor: pointOutlines[chart.data.datasets.length],
        pointStyle: pointStyles[chart.data.datasets.length]
      });
      filteredDatasets.push(chart.data.datasets[chart.data.datasets.length - 1]);
    } else {
      const indexOfDataset = chart.data.datasets.indexOf(filteredDatasets[0]);
      chart.data.datasets[indexOfDataset].backgroundColor = pointBackgrounds[indexOfDataset];
      chart.data.datasets[indexOfDataset].borderColor = pointOutlines[indexOfDataset];
      chart.data.datasets[indexOfDataset].pointStyle = pointStyles[indexOfDataset];
    }

    const cdamDataIndex = chart.data.datasets.indexOf(filteredDatasets[0]);
    chart.data.datasets[cdamDataIndex].data = [];

    index = 0;
    while (chart.data.datasets[cdamDataIndex].data.length < numSteps && hero.crit < 351) {
      if (hero.crit < 150) {
        hero.crit += 1;
        chart.data.datasets[cdamDataIndex].data.push(null);
        continue;
      }
      const damage = hero.getDamage(selected, soulburn);
      const finalDam = displayDmg(damage, damageToUse);
  
      chart.data.datasets[cdamDataIndex].data.push(finalDam);
      chart.data.labels[index] = `${chart.data.labels[index] ? chart.data.labels[index] + ' vs ' : ''}${hero.crit} ${formLabel('cdam')}`;
      hero.crit += 1;
      index++;
    }
  }

  hero.crit = inputValues.crit;

  if (skill.defenseScaling || artifact.defenseScaling) {
    const defStep = Math.max(Math.floor(((8 / 7) / 100) * hero.baseDef), 1);
    filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('defense'));
    if (!filteredDatasets.length) {
      chart.data.datasets.push({
        label: formLabel('defense'),
        data: [],
        borderWidth: 1,
        backgroundColor: pointBackgrounds[chart.data.datasets.length],
        borderColor: pointOutlines[chart.data.datasets.length],
        pointStyle: pointStyles[chart.data.datasets.length]
      });
      filteredDatasets.push(chart.data.datasets[chart.data.datasets.length - 1]);
    } else {
      const indexOfDataset = chart.data.datasets.indexOf(filteredDatasets[0]);
      chart.data.datasets[indexOfDataset].backgroundColor = pointBackgrounds[indexOfDataset];
      chart.data.datasets[indexOfDataset].borderColor = pointOutlines[indexOfDataset];
      chart.data.datasets[indexOfDataset].pointStyle = pointStyles[indexOfDataset];
    }

    const defDataIndex = chart.data.datasets.indexOf(filteredDatasets[0]);

    chart.data.datasets[defDataIndex].data = [];
    hero.def = inputValues['caster-defense'] - (intersectionPoint *  defStep);

    index = 0;
    while (chart.data.datasets[defDataIndex].data.length < numSteps) {
      //TODO: null if below base.  Do for atk also
      // if (hero.crit < 150) {
      //   hero.crit += 1;
      //   chart.data.datasets[1].data.push(null)
      //   continue;
      // }
      const damage = hero.getDamage(selected, soulburn);
      const finalDam = displayDmg(damage, damageToUse);
  
      chart.data.datasets[defDataIndex].data.push(finalDam);
      chart.data.labels[index] = `${chart.data.labels[index] ? chart.data.labels[index] + ' vs ' : ''}${hero.def} ${formLabel('defense')}`;
      hero.def += defStep; //TODO: deal with anything that might affect this number like innate boosts
      index++;
    }
    hero.def = inputValues['caster-defense'];
  }
  
  if (skill.hpScaling || artifact.hpScaling) {
    const hpStep = Math.max(Math.floor(((8 / 7) / 100) * hero.baseHP), 1);
    filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('hp'));
    if (!filteredDatasets.length) {
      chart.data.datasets.push({
        label: formLabel('hp'),
        data: [],
        borderWidth: 1,
        backgroundColor: pointBackgrounds[chart.data.datasets.length],
        borderColor: pointOutlines[chart.data.datasets.length],
        pointStyle: pointStyles[chart.data.datasets.length]
      });
      filteredDatasets.push(chart.data.datasets[chart.data.datasets.length - 1]);
    } else {
      const indexOfDataset = chart.data.datasets.indexOf(filteredDatasets[0]);
      chart.data.datasets[indexOfDataset].backgroundColor = pointBackgrounds[indexOfDataset];
      chart.data.datasets[indexOfDataset].borderColor = pointOutlines[indexOfDataset];
      chart.data.datasets[indexOfDataset].pointStyle = pointStyles[indexOfDataset];
    }

    const HPDataIndex = chart.data.datasets.indexOf(filteredDatasets[0]);

    chart.data.datasets[HPDataIndex].data = [];
    hero.hp = inputValues['caster-max-hp'] * (artifacts[artifact.id]?.maxHP || 1) - (intersectionPoint *  hpStep);

    index = 0;
    while (chart.data.datasets[HPDataIndex].data.length < numSteps) {
      //TODO: null if below base.  Do for atk also
      // if (hero.crit < 150) {
      //   hero.crit += 1;
      //   chart.data.datasets[1].data.push(null)
      //   continue;
      // }
      const damage = hero.getDamage(selected, soulburn);
      const finalDam = displayDmg(damage, damageToUse);
  
      chart.data.datasets[HPDataIndex].data.push(finalDam);
      chart.data.labels[index] = `${chart.data.labels[index] ? chart.data.labels[index] + ' vs ' : ''}${hero.hp} ${formLabel('hp')}`;
      hero.hp += hpStep; //TODO: deal with anything that might affect this number like innate boosts
      index++;
    }
    hero.hp = inputValues['caster-max-hp'];
  }
  
  if (skill.spdScaling || artifact.spdScaling) {
    const spdStep = (4 / 7);
    filteredDatasets = chart.data.datasets.filter(dataset => dataset.label === formLabel('speed'));
    if (!filteredDatasets.length) {
      chart.data.datasets.push({
        label: formLabel('speed'),
        data: [],
        borderWidth: 1,
        backgroundColor: pointBackgrounds[chart.data.datasets.length],
        borderColor: pointOutlines[chart.data.datasets.length],
        pointStyle: pointStyles[chart.data.datasets.length]
      });
      filteredDatasets.push(chart.data.datasets[chart.data.datasets.length - 1]);
    } else {
      const indexOfDataset = chart.data.datasets.indexOf(filteredDatasets[0]);
      chart.data.datasets[indexOfDataset].backgroundColor = pointBackgrounds[indexOfDataset];
      chart.data.datasets[indexOfDataset].borderColor = pointOutlines[indexOfDataset];
      chart.data.datasets[indexOfDataset].pointStyle = pointStyles[indexOfDataset];
    }

    const spdDataIndex = chart.data.datasets.indexOf(filteredDatasets[0]);

    chart.data.datasets[spdDataIndex].data = [];
    hero.spd = inputValues['caster-speed'] - (intersectionPoint * spdStep);

    index = 0;
    while (chart.data.datasets[spdDataIndex].data.length < numSteps) {
      //TODO: null if below base.  Do for atk also
      // if (hero.crit < 150) {
      //   hero.crit += 1;
      //   chart.data.datasets[1].data.push(null)
      //   continue;
      // }
      const damage = hero.getDamage(selected, soulburn);
      const finalDam = displayDmg(damage, damageToUse);
  
      chart.data.datasets[spdDataIndex].data.push(finalDam);
      chart.data.labels[index] = `${chart.data.labels[index] ? chart.data.labels[index] + ' vs ' : ''}${Math.floor(hero.spd)} ${formLabel('speed')}`;
      hero.spd += spdStep; //TODO: deal with anything that might affect this number like innate boosts
      index++;
    }
    hero.spd = inputValues['caster-speed'];
  }
  chart.update();
};
