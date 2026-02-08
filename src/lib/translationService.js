
import axios from 'axios';

let translationCache = {};


// Load cache from localStorage
try {
    const saved = localStorage.getItem('translationCache');
    if (saved) {
        translationCache = JSON.parse(saved);
    }
} catch (e) {
    console.warn('Failed to load translation cache', e);
}

export const translateText = async (text, targetLang) => {
    if (!text) return '';
    if (targetLang === 'en') return text; // Assuming source is 'en'

    const cacheKey = `${text}_${targetLang}`;
    if (translationCache[cacheKey]) {
        return translationCache[cacheKey];
    }

    try {
        const response = await axios.get(`https://translate.googleapis.com/translate_a/single`, {
            params: {
                client: 'gtx',
                sl: 'auto',
                tl: targetLang,
                dt: 't',
                q: text
            }
        });

        if (response.data && response.data[0] && response.data[0][0]) {
            const translatedText = response.data[0].map(item => item[0]).join('');
            translationCache[cacheKey] = translatedText;

            // Save to localStorage
            try {
                localStorage.setItem('translationCache', JSON.stringify(translationCache));
            } catch {
                // Ignore storage errors
            }

            return translatedText;
        }
    } catch (error) {
        console.error('Translation error:', error);
    }

    return text; // Fallback to original
};
