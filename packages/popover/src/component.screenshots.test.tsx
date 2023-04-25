import { createPreview } from '../../screenshot-utils';

describe('Popover', () =>
    createPreview(
        {
            componentName: 'Popover',
            testStory: false,
            knobs: {
                open: true,
            },
        },
        'alignItems: flex-start;paddingTop: 110px',
    ));
