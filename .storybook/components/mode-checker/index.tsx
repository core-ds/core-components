import React from 'react';
import { setModeVars } from '../../addons/mode-switcher/utils';
import { MODE_COLORS_TAG_ID } from '../../addons/utils';

/**
 * Устанавливает режим в зависимости от параметра урла. Нужно для превьюх компонент
 */
export const ModeChecker = () => {
    React.useEffect(() => {
        const isStory = window.parent?.location.pathname.includes('/iframe.html');
        if (isStory) {
            const mode = !!document.getElementById(MODE_COLORS_TAG_ID)?.textContent
                ? 'dark'
                : 'light';
            const params = new URLSearchParams(window.location.search);
            const newMode = params.get('darkMode') === 'true' ? 'dark' : 'light';

            if (newMode !== mode) {
                setModeVars(newMode, document);
            }
        }
    }, []);

    return null;
};
