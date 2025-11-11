import {
    setupScreenshotTesting,
    createStorybookUrl,
    createPreview,
} from '@alfalab/core-components-screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('UniversalDateInput', () =>
    createPreview(
        {
            componentName: 'UniversalDateInput',
            knobs: {
                size: 56,
                value: new Date('2023-01-01').getTime(),
                label: 'Дата',
                block: true,
                view: 'date',
                picker: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));

describe('UniversalDateInput | calendar popover', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme — desktop calendar popover`,
                    createStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputDesktopCalendarPopover',
                        knobs: {
                            view: 'date',
                        },
                    }),
                ],
                [
                    `${theme} theme — mobile calendar popover`,
                    createStorybookUrl({
                        packageName: 'universal-date-input',
                        componentName: 'UniversalDateInputMobileCalendarPopover',
                        knobs: {
                            view: 'date',
                        },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            theme,
        })();

    ['default', 'site', 'corp'].forEach((theme) => testCase(theme));
});
