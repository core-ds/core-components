import { createPreview } from '@alfalab/core-components-screenshot-utils';

describe('NumberInput ', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'NumberInput',
        },
        'transform:scale(2.1)',
    ));
