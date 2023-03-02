import { getCurrentUrlParams, getPageNode, handleLinks } from './utils';
import { ACTIONS, CATEGORY } from './constant';
import { trackEvent } from './trackEvent';

const switcherState = {};

const { FOLDER, SEARCH_VALUE } = ACTIONS;

const observePanel = () => {
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

export const observePanelComponent = observePanel();

export const observeTab = () => {
    const tabsNode = getPageNode('.sto-1amsdi0');

    const observer = new MutationObserver(() => {
        const params = getCurrentUrlParams();
        const { textContent } = getPageNode('[data-selected="true"]');

        if (params.includes('/story/')) {
            trackEvent({
                category: CATEGORY.TAB,
                action: 'Canvas view',
                label: textContent,
            });
            return;
        }
        trackEvent({
            category: CATEGORY.TAB,
            action: 'Docs view',
            label: textContent,
        });
    });

    const observerConfig = { childList: true };

    observer.observe(tabsNode, observerConfig);
};

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

export const observeLink = () => {
    const link = handleLinks(getCurrentUrlParams());

    trackEvent({ category: CATEGORY.USERS, action: 'Page view', label: link });
};

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

                    observePanelComponent();
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
