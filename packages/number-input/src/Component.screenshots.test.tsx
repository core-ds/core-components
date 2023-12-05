import { createPreview } from '../../screenshot-utils';

describe('NumberInput ', () =>
    createPreview(
        {
            componentName: 'NumberInput',
            knobs: {
                label: 'Число',
                value: 1234,
                size: 56,
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));
