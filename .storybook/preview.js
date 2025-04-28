import React from 'react';
import cn from 'classnames';
import { addons } from '@storybook/manager-api';
import { setThemeStylesInIframeHtmlPage, themeChangeListen } from './addons/theme-switcher/utils';
import { modeChangeListen, setModeVarsInIframeHtmlPage } from './addons/mode-switcher/utils';
import { ModeChecker } from './components/mode-checker';
import { rmCommentsFromCss, setGuidelinesStyles } from './addons/utils';
import { LIVE_EXAMPLES_ADDON_ID } from 'storybook-addon-live-examples';
import guidelinesStyles from '!css-loader!!postcss-loader!./public/guidelines.css';
import './blocks/code-editor/github-light-theme.css';

import alfaTheme from './theme';
import scope from './scope';

setThemeStylesInIframeHtmlPage();
setModeVarsInIframeHtmlPage();
modeChangeListen();
themeChangeListen();

if (window.location.href.includes('guidelines')) {
    setGuidelinesStyles(rmCommentsFromCss(guidelinesStyles.toString()));
}

const editorTheme = { styles: [] };

addons.setConfig({
    [LIVE_EXAMPLES_ADDON_ID]: {
        editorTheme,
        sandboxPath: '/docs/sandbox--docs',
        mobileFrameName: 'mobileframe--docs',
        desktopText: 'Переключить на декстопную версию',
        mobileText: 'Переключить на мобильную версию',
        expandText: 'Показать код',
        resetText: 'Сбросить код',
        copyText: 'Скопировать код',
        shareText: 'Поделиться кодом',
        copiedText: 'Код скопирован',
        sharedText: 'Ссылка скопирована',
        viewMismatchBg: 'var(--color-light-base-bg-primary)',
        bgColor: 'var(--color-light-base-bg-secondary)',
        previewBgColor: 'var(--color-light-base-bg-primary)',
        borderColor: 'var(--color-light-neutral-400)',
        borderRadius: 'var(--border-radius-16)',
        hintColor: 'var(--color-light-text-secondary)',
        iconColor: 'var(--color-light-base-bg-primary-inverted)',
        errorsBg: 'var(--color-light-status-muted-negative)',
        errorsColor: 'var(--color-light-accent-primary)',
        fontBase: 'var(--font-family-system)',
        fontCode: 'Monaco, Menlo, monospace',
        fontSizeBase: 16,
        fontSizeCode: 14,
        defaultCanvas: true,
        noDesktopText: 'Не предназначен для использования на десктопных устройствах',
        noMobileText: 'Не предназначен для использования на мобильных устройствах',
        scope: {
            ...scope,
        },
    },
});

export const parameters = {
    viewMode: 'docs',
    docs: {
        theme: alfaTheme,
        components: {
            h1: ({ children, ...restProps }) => (
                <h1 {...restProps} className={cn(restProps.className, 'sbdocs-h1')}>
                    {children}
                </h1>
            ),
            h2: ({ children, ...restProps }) => (
                <h2 {...restProps} className={cn(restProps.className, 'sbdocs-h2')}>
                    {children}
                </h2>
            ),
            h3: ({ children, ...restProps }) => (
                <h3 {...restProps} className={cn(restProps.className, 'sbdocs-h3')}>
                    {children}
                </h3>
            ),
            h4: ({ children, ...restProps }) => (
                <h4 {...restProps} className={cn(restProps.className, 'sbdocs-h4')}>
                    {children}
                </h4>
            ),
            p: ({ children, ...restProps }) => (
                <p {...restProps} className={cn(restProps.className, 'sbdocs-p')}>
                    {children}
                </p>
            ),
            li: ({ children, ...restProps }) => (
                <li {...restProps} className={cn(restProps.className, 'sbdocs-li')}>
                    {children}
                </li>
            ),
        },
    },
    options: {
        storySort: {
            method: 'alphabetical',
            order: [
                'Quick start',
                'Components overview',
                'Icons overview',
                'Token converter',
                'Changelog',
                'Museum',
                'Sandbox',
                'Components',
                'Deprecated components',
                'Patterns',
                'Tokens & assets',
                ['Иконки', 'Брейкпоинты', 'Отступы', 'Типографика', 'Цвета', 'CSS-переменные'],
                'Accessibility',
                ['Для чего'],
                'For users',
                ['Подключение', 'Темизация', 'Поддерживаемые браузеры'],
                'For contributors',
                ['Создание компонентов'],
            ],
        },
    },
};

export const decorators = [
    (Story) => {
        return (
            <div className='sb-unstyled'>
                <ModeChecker />
                <Story />
            </div>
        );
    },
];
