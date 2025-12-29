import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Underlay', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'Underlay',
            knobs: {},
        },
        'transform:scale(1.6)',
    );
});

describe(
    'Underlay | backgroundColor props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Underlay',
                    knobs: {
                        children: 'Content',
                        backgroundColor: [
                            'accent',
                            'info',
                            'attention-muted',
                            'positive-muted',
                            'negative-muted',
                            'primary-inverted',
                            'secondary',
                            'secondary-inverted',
                        ],
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Underlay',
                    knobs: {
                        children: 'Content',
                        backgroundColor: [
                            'tertiary',
                            'tertiary-inverted',
                            'quaternary',
                            'quaternary-inverted',
                            'specialbg-component',
                            'specialbg-primary-grouped',
                            'specialbg-tertiary-grouped',
                            'specialbg-secondary-transparent',
                            'specialbg-tertiary-transparent',
                        ],
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
            [
                'sprite-inverted',
                createSpriteStorybookUrl({
                    componentName: 'Underlay',
                    inverted: true,
                    knobs: {
                        backgroundColor: [
                            'specialbg-component-inverted',
                            'specialbg-secondary-transparent-inverted',
                            'specialbg-tertiary-transparent-inverted',
                        ],
                        children: 'Content',
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 840,
            height: 100,
        },
    }),
);

describe(
    'Underlay | border props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Underlay',
                    knobs: {
                        borderRadius: 'm',
                        children: 'Content',
                        borderColor: [
                            'accent',
                            'key',
                            'link',
                            'primary',
                            'primary-inverted',
                            'secondary',
                            'secondary-inverted',
                            'tertiary',
                            'tertiary-inverted',
                        ],
                        borderSize: 2,
                        backgroundColor: 'primary',
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Underlay',
                    knobs: {
                        borderRadius: 'm',
                        children: 'Content',
                        borderColor: [
                            'underline',
                            'underline-inverted',
                            'graphic-attention',
                            'graphic-link',
                            'graphic-negative',
                            'graphic-positive',
                            'specialbg-secondary-transparent',
                            'specialbg-tertiary-transparent',
                        ],
                        borderSize: 2,
                        backgroundColor: 'primary',
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
            [
                'sprite-inverted',
                createSpriteStorybookUrl({
                    componentName: 'Underlay',
                    inverted: true,
                    knobs: {
                        borderColor: [
                            'key-inverted',
                            'specialbg-secondary-transparent-inverted',
                            'specialbg-tertiary-transparent-inverted',
                        ],
                        children: 'Content',
                        backgroundColor: 'none',
                        borderSize: 2,
                        borderRadius: 'm',
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 840,
            height: 100,
        },
    }),
);
describe(
    'Underlay | shadow props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Underlay',
                    knobs: {
                        children: 'Content',
                        backgroundColor: 'info',
                        shadow: [
                            'shadow-xs',
                            'shadow-s',
                            'shadow-m',
                            'shadow-l',
                            'shadow-xl',
                            'shadow-xs-hard',
                            'shadow-s-hard',
                            'shadow-m-hard',
                            'shadow-l-hard',
                            'shadow-xl-hard',
                        ],
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Underlay',
                    knobs: {
                        children: 'Content',
                        backgroundColor: 'info',
                        shadow: [
                            'shadow-xs-up',
                            'shadow-s-up',
                            'shadow-m-up',
                            'shadow-l-up',
                            'shadow-xl-up',
                            'shadow-xs-hard-up',
                            'shadow-s-hard-up',
                            'shadow-m-hard-up',
                            'shadow-l-hard-up',
                            'shadow-xl-hard-up',
                        ],
                    },
                    size: { width: 400, height: 60 },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 840,
            height: 100,
        },
    }),
);
