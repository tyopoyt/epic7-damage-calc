import * as _ from 'lodash-es';

export class Language {
    name: string;
    localName: string;
    code: string;
    countryCode: string;
    custom?: boolean = false;

    constructor(language: any) {
        this.name = _.get(language, 'name', 'English');
        this.localName = _.get(language, 'localName', 'English');
        this.code = _.get(language, 'code', 'en');
        this.countryCode = _.get(language, 'countryCode', 'us');
      }
}

export const Languages: Record<string, Language> = {
    'us': {
        name: 'English',
        localName: 'English',
        code: 'en',
        countryCode: 'us'
    },
    'jp': {
        name: 'Japanese',
        localName: '日本語',
        code: 'ja',
        countryCode: 'jp'
    },
    'kr': {
        name: 'Korean',
        localName: '한국어',
        code: 'ko',
        countryCode: 'kr'
    },
    'tw': {
        name: 'Chinese (Traditional)',
        localName: '繁體中文',
        code: 'zh',
        countryCode: 'tw'
    },
    'cn': {
        name: 'Chinese (Simplified)',
        localName: '简体中文',
        code: 'zh',
        countryCode: 'cn'
    },
    'br': {
        name: 'Portuguese',
        localName: 'Português (BR)',
        code: 'pt',
        countryCode: 'br'
    },
}