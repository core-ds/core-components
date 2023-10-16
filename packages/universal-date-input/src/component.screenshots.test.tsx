import { createPreview } from '../../screenshot-utils';

describe('UniversalDateInput', () =>
    createPreview(
        {
            componentName: 'UniversalDateInput',
            knobs: {
                size: 'm',
                value: '01.01.2023',
                label: 'Дата',
                block: true,
                view: 'date',
                picker: true,
            },
        },
        'padding: 0 270px;width:800px;transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 600 },
        },
    ));
