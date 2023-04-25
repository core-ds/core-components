import { createPreview } from '../../screenshot-utils';

describe('Checkbox', () => {
    createPreview(
        {
            componentName: 'Checkbox',
            knobs: {
                label: 'Чекбокс',
                size: 'm',
                checked: true,
            },
        },
        'transform:scale(2.3)',
    );
});
