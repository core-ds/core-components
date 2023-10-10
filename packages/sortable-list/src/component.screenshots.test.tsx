import { createPreview } from '../../screenshot-utils';

describe('SortableList', () =>
    createPreview(
        {
            testStory: false,
            componentName: 'SortableList',
            knobs: {},
        },
        'transform:scale(1.6)',
    ));
