import { createPreview } from '../../screenshot-utils';

describe('MaskedInput ', () =>
    createPreview(
        {
            componentName: 'MaskedInput',
            knobs: {
                label: 'Поле с маской',
                value: '0000 0000 0000 0000',
                size: 56,
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));
