import { createPreview } from '../../screenshot-utils';

describe('PhoneInput ', () =>
    createPreview(
        {
            componentName: 'PhoneInput',
            knobs: {
                label: 'Телефон',
                value: '+71234567890',
                size: 'm',
                block: true,
            },
        },
        'padding: 0 270px; transform:scale(2.1)',
    ));
