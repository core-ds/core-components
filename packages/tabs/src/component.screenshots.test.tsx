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
        'transform:scale(2.2)',
    );
});

// TODO: кривые скриншоты
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
            matchImageSnapshotOptions: {
                failureThresholdType: 'pixel',
                // TODO: ширина линии на сервере чуть больше
                failureThreshold: 40,
                customSnapshotIdentifier: (...args) =>
                    `${theme}-${customSnapshotIdentifier(...args)}`,
            },
            theme,
        })();

    ['default', 'click', 'site', 'corp'].map(testCase);
});
