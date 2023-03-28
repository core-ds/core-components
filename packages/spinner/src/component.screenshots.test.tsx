import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Spinner | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Spinner',
                    knobs: {
                        size: ['s', 'm'],
                        visible: [false, true],
                    },
                    size: { width: 100, height: 60 },
                }),
            ],
        ],
        evaluate: async (page) => {
            // Не работают идентификаторы,содержащие ":", почему непонятно.
            await page.$$eval('*[id*=":"]', (el) =>
                el.forEach((e) => e.setAttribute('id', e.getAttribute('id')!.replace(/:/g, ''))),
            );

            await page.$$eval('*[stroke*=":"]', (el) =>
                el.forEach((e) =>
                    e.setAttribute('stroke', e.getAttribute('stroke')!.replace(/:/g, '')),
                ),
            );
        },
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 250,
            height: 100,
        },
    }),
);
