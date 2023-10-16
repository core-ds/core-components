import { createPreview } from '../../screenshot-utils';

describe('Space', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'Space',
            knobs: {},
        },
        'transform:scale(1.6)',
    ));
