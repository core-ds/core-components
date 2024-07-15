import { createPreview } from '../../screenshot-utils';

describe('PhoneInput ', () =>
    createPreview(
        {
            componentName: 'PhoneInput',
            knobs: {
                label: 'Телефон',
                value: '+71234567890',
                size: 56,
                block: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));
