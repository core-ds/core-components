import { createPreview } from '../../screenshot-utils';

describe('MaskedInput ', () =>
    createPreview(
        {
            componentName: 'MaskedInput',
            knobs: {
                label: 'Поле с маской',
                value: '0000 0000 0000 0000',
                size: 'm',
                block: true,
            },
        },
        'padding: 0 270px; transform:scale(2.1)',
    ));
