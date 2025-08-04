import { createPreview } from '@alfalab/core-components-screenshot-utils';

describe('Gap', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Gap',
            knobs: {},
        },
        'transform:scale(1.6)',
    ));
