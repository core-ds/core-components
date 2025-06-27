import { createPreview } from '@alfalab/core-components-screenshot-utils';

describe('Grid', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Grid',
            knobs: {},
        },
        'transform:scale(1.3)',
    ));
