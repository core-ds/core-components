import { createPreview } from '@alfalab/core-components-screenshot-utils';

describe('Notification', () => {
    createPreview(
        {
            componentName: 'ToastPlate',
            knobs: {
                title: 'Заголовок',
                children: 'Пример сообщения',
                hasCloser: true,
                actionButton: 'Кнопка',
                block: true,
            },
        },
        'width:800px;transform:scale(1.5);padding:0 210px',
        {
            viewport: { width: 1024, height: 600 },
        },
    );
});
