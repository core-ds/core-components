import { TRACK_EVENT } from './trackEvent';
import { COMPONENT_TITLE } from './constant';

/**
 * Следит за прямыми переходами на компоненты и пользователями.
 */
const observeLink = () => {
    const url = window.location.search;
    const currentComponent = document.title.split(' ')[COMPONENT_TITLE];

    TRACK_EVENT.USER();

    if (url.includes('docs')) {
        TRACK_EVENT.DOCS(currentComponent);
        return;
    }
    TRACK_EVENT.CANVAS(currentComponent);
};

/**
 * Следит за переключением компонент, что вбивают в поиск.
 */
const observeExplorerMenu = () => {
    const sidePanel = document.querySelector('#storybook-explorer-tree');
    const input = document.querySelector('#storybook-explorer-searchfield');

    let isSearchInputFocusing = false;

    if (!sidePanel) {
        return;
    }

    if (input) {
        input.addEventListener('focusin', () => {
            isSearchInputFocusing = true;
        });
    }

    const setupObserver = () => {
        const callback = (mutationList) => {
            for (const mutation of mutationList) {
                const { target } = mutation;
                const currentComponent = target?.innerText;
                const dataNodeType = target?.getAttribute?.('data-nodetype');
                const isSelectedComponent = target?.getAttribute?.('aria-expanded');
                const isSelectedCanvasStory = target?.getAttribute?.('data-selected');

                switch (true) {
                    case dataNodeType === 'component' && isSelectedComponent === 'true':
                        if (isSearchInputFocusing) {
                            TRACK_EVENT.SEARCH_VALUE(currentComponent);
                            isSearchInputFocusing = false;
                            return;
                        }

                        TRACK_EVENT.DOCS(currentComponent);
                        break;
                    case dataNodeType === 'story' && isSelectedCanvasStory === 'true':
                        TRACK_EVENT.CANVAS(currentComponent);
                        break;
                    default:
                        break;
                }
            }
        };

        const observer = new MutationObserver(callback);

        const config = {
            attributeFilter: ['data-selected', 'aria-expanded'],
            subtree: true,
        };

        observer.observe(sidePanel, config);
    };

    setupObserver();
};

export const setManagerObserveConnection = () => {
    window.addEventListener('load', () => {
        observeLink();
        observeExplorerMenu();
    });
};
