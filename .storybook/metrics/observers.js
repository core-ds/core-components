import { getCurrentUrlParams, getPageNode, handleLinks } from './utils';
import { ACTIONS, CATEGORY } from './constant';
import { trackEvent } from './trackEvent';

const switcherState = {};

const { FOLDER, SEARCH_VALUE } = ACTIONS;

/**
 * Следит за переключение режимов вьюера для компонента (деск мобайл) и открытием кода компонента
 */
const createPreviewFrameComponentObserver = () => {
    let observer = null;

    return () => {
        const disconnectObserver = () => {
            if (observer) {
                observer.disconnect();
            }
        };

        if (observer) {
            disconnectObserver();
        }

        const iframe = getPageNode('#storybook-preview-iframe');
        const nodeList = iframe.contentDocument.querySelector('#docs-root');

        const setupObserver = () => {
            observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    const { type, target } = mutation;

                    if (type === 'attributes' && target?.tagName === 'BUTTON') {
                        const isActive = target?.classList.contains('active');

                        if (isActive) {
                            const { textContent } = getPageNode('[data-selected="true"]');

                            trackEvent({
                                category: CATEGORY.EDITOR,
                                label: `${target?.title}`,
                                value: textContent,
                            });
                        }
                    }
                });
            });

            const observerConfig = {
                childList: true,
                subtree: true,
                attributes: true,
            };

            observer.observe(nodeList, observerConfig);
        };

        setupObserver();
    };
};

export const observePreviewFrameComponent = createPreviewFrameComponentObserver();

/**
 * Следит за открытием таба докс/канвас
 */
export const observePreviewModeTabs = () => {
    const nodeMain = getPageNode('[role="main"]');

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
 * Следит за переключение режимов компонента
 */
export const observeSwitcher = () => {
    const tools = document.querySelectorAll('.select');

    const themeSelect = tools[0];
    const modeSelect = tools[1];

    switcherState.mode = modeSelect[0].value;
    switcherState.theme = themeSelect[0].value;

    const handleSelect = (key) => {
        return (event) => {
            const { textContent } = getPageNode('[data-selected="true"]');
            const target = event.target;

            if (target) {
                switcherState[key] = target.value;

                const { mode, theme } = switcherState;

                trackEvent({
                    category: CATEGORY.SWITCHER,
                    label: textContent,
                    dimension_1: theme,
                    dimension_2: mode,
                });
            }
        };
    };

    modeSelect.addEventListener('change', handleSelect('mode'));
    themeSelect.addEventListener('change', handleSelect('theme'));
};

/**
 * Следит за переходами по прямым ссылкам
 */
export const observeLink = () => {
    const link = handleLinks(getCurrentUrlParams());

    trackEvent({ category: CATEGORY.USERS, action: 'Page view', label: link });
};

/**
 * Следит за вызовом поиска, что вбивают в поиск, сворачивание папок, открытие конкретной страницы
 */
export const observeExplorerMenu = () => {
    let isSearchValueFocusing;

    const titlePageNode = getPageNode('#storybook-explorer-tree');
    const input = getPageNode('#storybook-explorer-searchfield');
    const { textContent } = getPageNode('[data-selected="true"]');

    const { mode, theme } = switcherState;

    trackEvent({
        category: CATEGORY.PAGE,
        label: textContent,
        dimension_1: theme,
        dimension_2: mode,
    });

    input.addEventListener('focusin', () => {
        trackEvent({ category: CATEGORY.PATH, label: `${SEARCH_VALUE}` });

        isSearchValueFocusing = true;
    });

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

                    observePreviewFrameComponent();
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

        observer.observe(titlePageNode, observerConfig);
    };

    setupObserver();
};
