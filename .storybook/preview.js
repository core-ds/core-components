import { addons } from '@storybook/addons';
import { addParameters } from '@storybook/react';
import { setThemeStylesInIframeHtmlPage } from './addons/theme-switcher/utils';
import { setModeVarsInIframeHtmlPage } from './addons/mode-switcher/utils';
import { setGuidelinesStyles } from './addons/utils';
import { LIVE_EXAMPLES_ADDON_ID } from 'storybook-addon-live-examples';

import guidelinesStyles from '!!postcss-loader!./public/guidelines.css';

import alfaTheme from './theme';
import scope from './scope';

setThemeStylesInIframeHtmlPage();
setModeVarsInIframeHtmlPage();

if (window.location.href.includes('guidelines')) {
    setGuidelinesStyles(guidelinesStyles);
}

addons.setConfig({
    [LIVE_EXAMPLES_ADDON_ID]: {
        sandboxPath: '/docs/компоненты-песочница--page',
        mobileFrameName: 'mobileframe--page',
        desktopText: 'Переключить на декстопную версию',
        mobileText: 'Переключить на мобильную версию',
        expandText: 'Показать код',
        copyText: 'Скопировать код',
        shareText: 'Поделиться кодом',
        bgColor: 'var(--color-light-bg-secondary)',
        previewBgColor: 'var(--color-light-bg-primary)',
        borderColor: 'var(--color-light-border-primary)',
        borderRadius: 'var(--border-radius-xl)',
        hintColor: 'var(--color-light-text-tertiary)',
        iconColor: 'var(--color-light-bg-primary-inverted)',
        errorsBg: 'var(--color-light-bg-negative-muted)',
        errorsColor: 'var(--color-light-text-accent)',
        fontBase: 'var(--font-family-system)',
        fontCode: 'Monaco, Menlo, monospace',
        fontSizeBase: 16,
        fontSizeCode: 14,
        defaultCanvas: true,
        noDesktopText: 'Не предназначен для использования на десктопных устройствах.',
        noMobileText: 'Не предназначен для использования на мобильных устройствах.',
        scope: {
            ...scope,
        },
    },
});

addParameters({
    viewMode: 'docs',
    docs: {
        theme: alfaTheme,
    },
    options: {
        storySort: {
            method: 'alphabetical',
            order: [
                'Инструкции',
                [
                    'Начало работы',
                    'Changelog',
                    'FAQ',
                    'Брейкпоинты',
                    'Темизация',
                    'Валидация',
                    'Доступность',
                    ['Что это?'],
                    'Скриншотное тестирование',
                    'Миграция со старых компонентов',
                    'Использование с другими библиотеками',
                    'Обновление Confirmation',
                    'Чек-лист для Code Review',
                ],
                'Токены и ассеты',
                ['Иконки', 'Отступы', 'Типографика', 'Цвета', 'CSS-переменные'],
                'Компоненты',
                [
                    'Песочница',
                    'Селекты',
                    'Кнопки',
                    'Инпуты',
                    'Контролы',
                    'Прогрессбары',
                    'Модалки и поповеры',
                    'Календари',
                    'Загрузка файлов',
                    'Уведомления',
                    'Таблицы и графики',
                    'Ожидание',
                    'Ячейки',
                    'Составные компоненты',
                    'Вспомогательные компоненты',
                    'Прочие компоненты',
                    'Другое',
                ],
            ],
        },
    },
});
