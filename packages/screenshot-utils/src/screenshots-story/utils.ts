import qs from 'querystring';

import { type CSSProperties } from 'react';

export const queryParams = qs.parse(document.location.search);

export const getQueryParam = (param: string, parse = false) => {
    const value = queryParams[param] as string;

    return parse ? parseValue(value) : value;
};

export const parseKnobs = () =>
    Object.entries(queryParams).reduce(
        (acc, [k, v]) => {
            if (k.startsWith('knob-')) {
                acc[k.replace('knob-', '')] = parseValue(v as string);
            }

            return acc;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as Record<string, any>,
    );

export function parseValue(value: string) {
    const isBoolean = () => ['true', 'false'].includes(value);
    const isNumeric = () => !Number.isNaN(+value) && !Number.isNaN(parseFloat(value));

    if (!value) return undefined;

    if (isBoolean()) return value === 'true';

    if (isNumeric()) return parseFloat(value);

    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

export function stylesStringToObj(str = ''): CSSProperties {
    if (!str) return {};

    const properties = str.split(';').map((v) => v.trim());
    const obj: Record<string, unknown> = {};

    properties.forEach((property) => {
        const [name, val] = property.split(':').map((v) => v.trim());

        obj[name] = val;
    });

    return obj as CSSProperties;
}

export function isJsonObj(str: unknown) {
    try {
        const ret = JSON.parse(str as string);

        return typeof ret === 'object';
    } catch (e) {
        return false;
    }
}
