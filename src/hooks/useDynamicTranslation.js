
import { useState, useEffect } from 'react';
import { translateText } from '../lib/translationService';
import { useLingoContext } from '@lingo.dev/compiler/react';

export function useDynamicTranslation(text) {
    const { locale } = useLingoContext();
    const [translatedText, setTranslatedText] = useState(text);

    useEffect(() => {
        let isMounted = true;

        const fetchTranslation = async () => {
            if (!text) {
                if (isMounted) setTranslatedText('');
                return;
            }
            if (locale === 'en') {
                if (isMounted) setTranslatedText(text);
                return;
            }

            const result = await translateText(text, locale);
            if (isMounted) {
                setTranslatedText(result);
            }
        };

        fetchTranslation();

        return () => {
            isMounted = false;
        };
    }, [text, locale]);

    return translatedText;
}
