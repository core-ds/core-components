import { createPreview } from '../../screenshot-utils';

describe('Checkbox', () => {
    createPreview(
        {
            componentName: 'Checkbox',
            knobs: {
                label: 'Checkbox',
                size: 'm',
                checked: true,
            },
        },
        'transform:scale(2.3)',
    );
});
