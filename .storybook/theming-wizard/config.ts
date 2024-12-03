import { Question } from './types';

export const config: Question[] = [
    {
        name: 'product',
        title: 'Тема продукта',
        variants: [
            {
                label: 'default',
                value: 'default',
            },
            {
                label: 'click',
                value: 'click',
            },
            {
                label: 'corp',
                value: 'corp',
            },
            {
                label: 'site',
                value: 'site',
            },
        ],
    },
    {
        name: 'keepCssVars',
        title: 'CSS-переменные',
        variants: [
            {
                label: 'Оставляем в проде',
                value: 'yes',
            },
            {
                label: 'Выпиливаем',
                value: 'no',
            },
        ],
    },
    {
        name: 'darkMode',
        title: 'Темный режим',
        variants: [
            {
                label: 'Есть',
                value: 'yes',
            },
            {
                label: 'Нет',
                value: 'no',
            },
        ],
    },
    {
        name: 'aruiScripts',
        title: 'arui-scripts',
        variants: [
            {
                label: 'Есть',
                value: 'yes',
            },
            {
                label: 'Нет',
                value: 'no',
            },
        ],
    },
];

export const defaultByProduct: {
    [key: string]: Record<Question['name'], string>;
} = {
    default: {
        product: 'default',
        keepCssVars: 'yes',
        darkMode: 'no',
        aruiScripts: 'yes',
    },
    click: {
        product: 'click',
        keepCssVars: 'yes',
        darkMode: 'no',
        aruiScripts: 'yes',
    },
    mobile: {
        product: 'mobile',
        keepCssVars: 'yes',
        darkMode: 'yes',
        aruiScripts: 'yes',
    },
    site: {
        product: 'site',
        keepCssVars: 'no',
        darkMode: 'no',
        aruiScripts: 'yes',
    },
    corp: {
        product: 'corp',
        keepCssVars: 'no',
        darkMode: 'no',
        aruiScripts: 'yes',
    },
};
