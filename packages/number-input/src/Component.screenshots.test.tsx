import { createPreview } from '../../screenshot-utils';

describe('NumberInput ', () =>
    createPreview(
        {
            componentName: 'NumberInput',
            knobs: {
                label: 'Число',
                value: 1234,
                size: 'm',
                block: true,
            },
        },
        'padding: 0 270px; transform:scale(2.1)',
    ));
