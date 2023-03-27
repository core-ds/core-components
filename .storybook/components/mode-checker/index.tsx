import React from 'react';
import { MODE_COLORS_TAG_ID, setModeVars } from '../../addons/mode-switcher/utils';

/**
 * Устанавливает режим в зависимости от параметра урла. Нужно для превьюх компонент
 */
export const ModeChecker = () => {
    React.useEffect(() => {
        const mode = !!document.getElementById(MODE_COLORS_TAG_ID)?.textContent ? 'dark' : 'light';
        const params = new URLSearchParams(window.location.search);
        const newMode = params.get('darkMode') === 'true' ? 'dark' : 'light';

        if (newMode !== mode) {
            setModeVars(newMode, document);
        }
    }, []);

    return null;
};
