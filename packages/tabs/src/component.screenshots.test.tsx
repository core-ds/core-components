import {
    setupScreenshotTesting,
    customSnapshotIdentifier,
    generateTestCases,
    createPreview,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe('Tabs ', () => {
    createPreview(
        {
            packageName: 'tabs',
            componentName: 'SecondaryTabListResponsive',
            knobs: {
                titles: '[{"title":"Таб 1","id":"1"},{"title":"Таб 2","id":"2"},{"title":"Таб 3","id":"3"}]',
                size: 'xs',
            },
        },
        'width:800px;transform:scale(2.2)',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});

describe('Tabs | TabsDesktop', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: generateTestCases({
                componentName: 'Tabs',
                testStory: false,
                knobs: {
                    TabsComponent: 'TabsDesktop',
                    view: ['primary', 'secondary'],
                    size: ['xxs', 'xs', 's', 'm', 'l', 'xl'],
                },
            }),
            viewport: {
                width: 700,
                height: 150,
            },
            evaluate: async (page) => {
                const primaryTab = await page.$$('button[id="tab-1"]');

                // При переключении тем меняется ширина таба, но ширина линии остается прежней, поэтому нужен такой хак!
                if (primaryTab.length) {
                    await page.click('button[id="tab-5"]');
                    await page.click('button[id="tab-1"]');
                }
            },
            matchImageSnapshotOptions: {
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();

    ['default', 'click', 'site', 'corp'].map(testCase);
});
