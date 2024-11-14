import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../../screenshot-utils';
import { COLORS_INVERTED, ROW_LIMITS, VIEWS_TITLE, WEIGHTS_TEXT } from '../types';
import { DEFAULT_TITLE_FONT } from '../title-base/component';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Typography', () =>
    createPreview(
        {
            componentName: 'Typography',
            subComponentName: 'Title',
            knobs: {
                children: 'Аа',
                view: 'xlarge',
                font: DEFAULT_TITLE_FONT,
            },
        },
        'transform:scale(4)',
    ));

describe(
    'Typography.Title | all variants',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [...VIEWS_TITLE],
                        weight: [...WEIGHTS_TEXT],
                        font: DEFAULT_TITLE_FONT,
                    },
                    size: { width: 550, height: 350 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [...VIEWS_TITLE],
                        weight: [...WEIGHTS_TEXT],
                        font: 'system',
                    },
                    size: { width: 550, height: 350 },
                }),
            ],
        ],
        viewport: { width: 1920, height: 1080 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Typography.Title | colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    knobs: {
                        // TODO отдельно сделать апдейт снепшотов, т.к. в тесте меняется порядок цветов, выглядит как баг, но его нет
                        // color: [...COLORS_MAIN],
                        color: [
                            'disabled',
                            'tertiary',
                            'accent',
                            'primary',
                            'attention',
                            'positive',
                            'secondary',
                            'link',
                            'negative',
                        ],
                        view: 'small',
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
            [
                'sprite-inverted',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    inverted: true,
                    knobs: {
                        color: [...COLORS_INVERTED],
                        view: 'small',
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
        ],
        viewport: { width: 900, height: 500 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Typography.Title | rowLimit',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Title',
                    knobs: {
                        children:
                            'Съешь ещё этих мягких французских булок, да выпей чаю. Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [...VIEWS_TITLE],
                        rowLimit: [...ROW_LIMITS],
                    },
                    size: { width: 550, height: 200 },
                }),
            ],
        ],
        viewport: { width: 1920, height: 1080 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
