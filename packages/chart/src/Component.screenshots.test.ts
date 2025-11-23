import { createPreview } from '@alfalab/core-components-screenshot-utils';

describe('Chart ', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Chart',
            subComponentName: 'Chart.Bar',
            knobs: {},
        },
        'transform:scale(0.9)',
        {
            evaluate: (page) => page.waitForTimeout(2000),
        },
    ));
