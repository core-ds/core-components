export type WithThemeColorValue = {
    type: 'WITH_THEME';
    value: string;
};

export type WithoutThemeColorValue = {
    type: 'WITHOUT_THEME';
    value: string;
};

export type ColorValue = WithThemeColorValue | WithoutThemeColorValue;

const toKebab = (str: string) =>
    str.replace(/[A-Z]|\d+/g, (match: string) => `-${match.toLowerCase()}`);

const notStandardNames = [
    {
        /*
         * Правило для проверки префиксов
         * На входе
         */
        colorPrefixIn: 'special-bg',
        // На выходе
        colorPrefixOut: 'specialbg',
        /*
         * так как true в дефолте, не пишем такой ключ
         * withTheme: true,
         */
    },
    {
        /*
         * Правило для проверки совпадений целиком
         * На входе
         */
        colorIn: 'transparent',
        // На выходе
        colorOut: 'dynamic-nulled',
        withTheme: false,
    },
];

/**
 * Функция преобразования цветов.
 * Делит названия цвета пополам, по ключевому слову Color на prefix и postfix, и преобразует в кебаб-стайл.
 * Есть обработка правил, не подходящие под шаблон.
 */
export const translateColors = (colorName: string): ColorValue => {
    let value = '';
    let withThemeSetting = true;

    // Привели в кебаб-стайл
    const colorNameLow = toKebab(colorName);
    // Разделили на префикс и постфикс
    const [startStrRaw, endStr = ''] = colorNameLow.split('-color');
    // Преобразовали ключевые слова
    const startStr = startStrRaw.replace('background', 'bg');

    // Обработка исключений
    for (let i = 0, ilen = notStandardNames.length; i < ilen && !value; i += 1) {
        const rule = notStandardNames[i];

        if (rule.colorPrefixIn && startStr === rule.colorPrefixIn) {
            value = `${rule.colorPrefixOut}${endStr}`;
        } else if (rule.colorIn === colorNameLow) {
            value = rule.colorOut;
        }

        if (value && rule.withTheme === false) {
            withThemeSetting = false;
        }
    }

    // Если исключения не сработали, то общее правило
    if (!value) {
        if (startStr.startsWith('static')) {
            withThemeSetting = false;
        }

        value = `${startStr}${endStr}`;
    }

    return {
        type: withThemeSetting ? 'WITH_THEME' : 'WITHOUT_THEME',
        value,
    };
};
