import { createPreview } from '../../screenshot-utils';

describe('NumberInput ', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'NumberInput',
        },
        'transform:scale(2.1)',
    ));
