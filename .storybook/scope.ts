import { ComponentType } from 'react';
import * as dateUtils from 'date-fns';
import * as knobs from '@storybook/addon-knobs';
import * as grid from './blocks/grid';

const coreComponentsContext =
    process.env.BUILD_STORYBOOK_FROM_DIST === 'true'
        ? require.context(
              '../dist',
              true,
              /^\.\/(.*)\/modern\/(index|(desktop|mobile|responsive|circle|super-ellipse|rectangle|no-shape|shared|collapsible)\/index).js$/,
          )
        : require.context(
              '../packages',
              true,
              /^\.\/(.*)\/src\/(index|(desktop|mobile|responsive|circle|super-ellipse|rectangle|no-shape|shared|collapsible)\/index).ts$/,
          );

const glyphContext = require.context('../node_modules/@alfalab/icons-glyph', true, /(.*).js$/);

const requireComponents = (context: __WebpackModuleApi.RequireContext) =>
    context.keys().reduce((acc: Record<string, ComponentType<unknown>>, key) => {
        Object.entries(context(key)).forEach(([componentName, component]: [string, any]) => {
            if (['default', '__esModule'].includes(componentName)) return;

            acc[componentName] = component;
        });

        return acc;
    }, {});

const BREAKPOINT = 600;

export default {
    BREAKPOINT,
    isMobile: () => document.body.clientWidth < BREAKPOINT,
    ...requireComponents(coreComponentsContext),
    ...requireComponents(glyphContext),
    ...grid,
    ...dateUtils,
    ...knobs,
};
