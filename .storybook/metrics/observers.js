import { getCurrentUrlParams, getPageNode, handleLinks } from './utils';
import { ACTIONS, CATEGORY, DEFAULT_ELEMENT } from './constant';
import { trackEvent } from './trackEvent';
import { ADDON_EVENTS } from 'storybook-addon-live-examples';

const switcherState = { mode: 'light', theme: 'default' };

const { FOLDER, SEARCH_VALUE } = ACTIONS;

/**
 * Следит за переключение режимов вьюера для компонента (деск мобайл) и открытием кода компонента
 */
export const observePreviewFrameComponent = () => {
    const eventHandler = (ev) => {
        const { view, shown } = ev.detail;
        const sidePanel = window.parent.document.querySelector('#storybook-explorer-tree');
        const currentComponent = sidePanel?.querySelector('.sidebar-item[data-selected="true"]');

        if (currentComponent) {
            trackEvent({
                category: CATEGORY.EDITOR,
                label: view ? `view=${view}` : `shown-source-code=${shown}`,
                value: currentComponent.textContent,
            });
        }
    };

    document.addEventListener(ADDON_EVENTS.VIEW_CHANGE, eventHandler);
    document.addEventListener(ADDON_EVENTS.SHOW_SOURCE_CODE, eventHandler);
};

/**
 * Следит за открытием таба докс/канвас
 */
export const observePreviewModeTabs = () => {
    const nodeMain = getPageNode('[role="main"]');

    if (!nodeMain) {
        return;
    }

    nodeMain.addEventListener('click', (event) => {
        const value = event?.target.innerHTML;
        const { textContent } = getPageNode('[data-selected="true"]');

        if (value === 'Canvas') {
            trackEvent({
                category: CATEGORY.TAB,
                action: `${value} view`,
                label: textContent,
            });
            return;
        }

        if (value === 'Docs') {
            trackEvent({
                category: CATEGORY.TAB,
                action: `${value} view`,
                label: textContent,
            });
        }
    });
};

/**
 * Следит за переключением режимов компонента
 */
export const observeSwitcher = () => {
    const handleSelect = (key) => {
        return (event) => {
            const { textContent: currentComponent } = getPageNode('[data-selected="true"]');
            const target = event.detail[key];

            if (target) {
                switcherState[key] = target;

                const { mode, theme } = switcherState;

                trackEvent({
                    category: CATEGORY.SWITCHER,
                    label: currentComponent,
                    dimension_1: theme,
                    dimension_2: mode,
                });
            }
        };
    };

    document.addEventListener('theme-change', handleSelect('theme'));
    document.addEventListener('mode-change', handleSelect('mode'));
};

/**
 * Следит за переходами по прямым ссылкам
 */
export const observeLink = () => {
    const link = handleLinks(getCurrentUrlParams());

    trackEvent({ category: CATEGORY.USERS, action: 'Page view', label: link });
};

/**
 * Следит за вызовом поиска, что вбивают в поиск, сворачивание папок, открытие конкретной страницы, переключение Docs/Canvas
 */
export const observeExplorerMenu = () => {
    let isSearchValueFocusing;

    const sidePanel = document.querySelector('#storybook-explorer-tree');
    const input = document.querySelector('#storybook-explorer-searchfield');
    const selected = sidePanel.querySelector('.sidebar-item[data-selected="true"]');

    const { mode, theme } = switcherState;

    if (selected) {
        trackEvent({
            category: CATEGORY.PAGE,
            label: selected.textContent,
            dimension_1: theme,
            dimension_2: mode,
        });
    }

    if (input) {
        input.addEventListener('focusin', () => {
            trackEvent({ category: CATEGORY.PATH, label: SEARCH_VALUE });

            isSearchValueFocusing = true;
        });
    }

    if (!sidePanel) {
        return;
    }

    const setupObserver = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const { target } = mutation;
                const isSelectedPage = target?.getAttribute('data-selected') === 'true';
                const isSelectedFolder = target?.hasAttribute('aria-expanded');
                const { mode, theme } = switcherState;

                if (target?.tagName === 'A' && isSelectedPage) {
                    if (isSearchValueFocusing) {
                        trackEvent({
                            category: CATEGORY.SEARCH_VALUE,
                            label: target.textContent,
                        });
                        isSearchValueFocusing = false;
                    }

                    trackEvent({
                        category: CATEGORY.PAGE,
                        label: target.textContent,
                        dimension_1: theme,
                        dimension_2: mode,
                    });

                    return;
                }

                if (target?.tagName === 'BUTTON' && isSelectedFolder) {
                    trackEvent({
                        category: CATEGORY.PATH,
                        label: `${FOLDER}`,
                        value: target.textContent,
                    });
                }
            });
        });

        const observerConfig = {
            childList: true,
            subtree: true,
            attributes: true,
        };

        observer.observe(sidePanel, observerConfig);
    };

    setupObserver();
};
