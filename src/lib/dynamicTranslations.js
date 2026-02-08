export const dynamicDictionary = {
    // English -> Target mapping
    'Important': {
        es: 'Importante',
        hi: 'महत्वपूर्ण',
        ja: '重要',
        pt: 'Importante'
    },
    'Do reach as early as possible': {
        es: 'Llegar lo antes posible',
        hi: 'जितni जल्दी हो सके पहुंचें',
        ja: 'できるだけ早く到着してください',
        pt: 'Chegue o mais cedo possível'
    },
    'Hii': {
        es: 'Hola',
        hi: 'नमस्ते',
        ja: 'こんにちは',
        pt: 'Oi'
    },
    'fsbdj': {
        es: 'fsbdj',
        hi: 'fsbdj',
        ja: 'fsbdj',
        pt: 'fsbdj'
    }
};

export const translateDynamic = (text, locale) => {
    if (locale === 'en' || !text) return text;
    return dynamicDictionary[text]?.[locale] || text;
};
