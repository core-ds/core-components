import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    generateTestCases,
    customSnapshotIdentifier,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 480, height: 100 };

describe('ToastPlate | main props', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'ToastPlate',
                        knobs: {
                            children: 'Вам одобрено. Согласитесь на предложение',
                            badge: [
                                'positive-checkmark',
                                'negative-cross',
                                'negative-alert',
                                'negative-block',
                                'attention-alert',
                                'neutral-information',
                                'neutral-operation',
                                'neutral-cross',
                                '',
                            ],
                            title: '',
                            hasCloser: [false, true],
                        },
                        size: clip,
                    }),
                ],
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'ToastPlate',
                        knobs: {
                            children: 'Вам одобрено. Согласитесь на предложение',
                            badge: [
                                'positive-checkmark',
                                'negative-cross',
                                'negative-alert',
                                'negative-block',
                                'attention-alert',
                                'neutral-information',
                                'neutral-operation',
                                'neutral-cross',
                                '',
                            ],
                            title: 'Поздравляем, полный успех',
                            hasCloser: [false, true],
                        },
                        size: clip,
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default', 'click'].map(testCase);
});

describe('ToastPlate | action button', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: generateTestCases({
                componentName: 'ToastPlate',
                testStory: false,
                knobs: {
                    children: 'Вам одобрено',
                    title: 'Поздравляем',
                    renderActionButton: true,
                },
            }),
            screenshotOpts: {
                clip,
            },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();

    ['default', 'click'].map(testCase);
});

describe('ToastPlate | inverted views', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: generateTestCases({
                componentName: 'ToastPlate',
                testStory: false,
                knobs: {
                    children: 'Вам одобрено',
                    title: 'Поздравляем',
                    renderActionButton: true,
                    colors: 'inverted',
                },
            }),
            screenshotOpts: {
                clip,
            },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();

    ['default', 'click'].map(testCase);
});
