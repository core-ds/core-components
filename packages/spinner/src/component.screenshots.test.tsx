import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    createSpriteStorybookUrl,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const evalFunc = async (page: Page) => {
    // Не работают идентификаторы,содержащие ":", почему непонятно.
    await page.$$eval('*[id*=":"]', (el) =>
        el.forEach((e) => e.setAttribute('id', e.getAttribute('id')!.replace(/:/g, ''))),
    );

    await page.$$eval('*[stroke*=":"]', (el) =>
        el.forEach((e) => e.setAttribute('stroke', e.getAttribute('stroke')!.replace(/:/g, ''))),
    );
};

describe('Spinner', () =>
    createPreview(
        {
            componentName: 'Spinner',
            knobs: {
                size: 48,
                visible: true,
            },
        },
        'transform:scale(3.2)',
        { evaluate: evalFunc },
    ));

describe(
    'Spinner | main props',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Spinner',
                    knobs: {
                        size: [24, 48],
                        visible: [false, true],
                    },
                    size: { width: 100, height: 60 },
                }),
            ],
        ],
        evaluate: evalFunc,
        screenshotOpts: {
            fullPage: true,
        },
        viewport: {
            width: 250,
            height: 100,
        },
    }),
);
