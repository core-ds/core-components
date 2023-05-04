import { createPreview } from '../../screenshot-utils';

describe('Table', () =>
    createPreview(
        {
            componentName: 'Table',
            knobs: {},
            testStory: false,
        },
        'transform:scale(0.6)',
    ));
