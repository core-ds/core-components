import { ComponentType } from 'react';
import * as dateUtils from 'date-fns';
import * as knobs from '@storybook/addon-knobs';
import * as grid from './blocks/grid';

let componentsContext;

if (process.env.BUILD_STORYBOOK_FROM_DIST === 'true') {
    try {
        componentsContext = require.context(
            '../dist',
            true,
            /^\.\/(.*)\/esm\/(index|desktop|mobile|responsive|circle|super-ellipse).js$/,
        );
    } catch (e) {
        console.error('Отсутствует директория dist (.storybook/scope.ts)');
    }
} else {
    componentsContext = require.context(
        '../packages',
        true,
        /^\.\/(.*)\/src\/(index|desktop|mobile|responsive|circle|super-ellipse).ts$/,
    );
}

const glyphContext = require.context('../node_modules/@alfalab/icons-glyph', true, /(.*).js$/);

const requireComponents = (context: __WebpackModuleApi.RequireContext) =>
    context.keys().reduce((acc: Record<string, ComponentType<unknown>>, key) => {
        Object.entries(context(key)).forEach(([componentName, component]: [string, any]) => {
            if (['default', '__esModule'].includes(componentName)) return;

            acc[componentName] = component;
        });

        return acc;
    }, {});

export default {
    ...(componentsContext ? requireComponents(componentsContext) : {}),
    ...requireComponents(glyphContext),
    ...grid,
    ...dateUtils,
    ...knobs,
};
