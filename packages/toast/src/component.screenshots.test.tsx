import { createPreview } from '@alfalab/core-components-screenshot-utils';

describe('Toast', () => {
    createPreview(
        {
            componentName: 'ToastPlate',
            knobs: {
                children: 'Пример сообщения',
                hasCloser: false,
            },
        },
        'transform:scale(2.5)',
    );
});
