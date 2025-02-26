import { createPreview } from '../../screenshot-utils';

describe('NumberInput ', () =>
    createPreview(
        {
            componentName: 'NumberInput',
            knobs: {
                label: 'Число',
                value: 1234,
                size: 56,
                step: 1,
            },
        },
        'transform:scale(1.6)',
    ));
