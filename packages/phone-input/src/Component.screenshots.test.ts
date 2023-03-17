import { createPreview } from '../../screenshot-utils';

describe('PhoneInput ', () =>
    createPreview(
        {
            componentName: 'PhoneInput',
            knobs: {
                label: 'Label',
                value: '+79995553535',
                size: 'm',
                block: true,
            },
        },
        'padding: 0 270px; transform:scale(2.3)',
    ));
