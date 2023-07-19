import { createPreview } from '../../screenshot-utils';

describe('Notification', () => {
    createPreview(
        {
            componentName: 'Notification',
            knobs: {
                title: 'Заголовок',
                children: 'Пример сообщения',
                hasCloser: true,
                actionButton: 'Кнопка',
                block: true,
                visible: true,
                offset: '185px',
            },
        },
        'transform:scale(2.1)',
        {
            viewport: { width: 1024, height: 400 },
            screenshotOpts: {
                clip: {
                    x: 580,
                    y: 50,
                    width: 800,
                    height: 400,
                },
            },
        },
    );
});
