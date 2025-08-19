import { createPreview } from '@alfalab/core-components-screenshot-utils';

describe('ProductCover ', () => {
    createPreview(
        {
            testStory: false,
            componentName: 'ProductCover',
            subComponentName: 'ProductCover.Stack',
            knobs: {
                size: 128,
            },
        },
        'transform:scale(2.1)',
        {
            evaluate: (page) => page.waitForTimeout(2000),
        },
    );
});
