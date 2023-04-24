import { createPreview } from '../../screenshot-utils';

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
        'transform:scale(1.5);padding:0 210px',
    );
});
