import { addons } from '@storybook/addons';
import alfaTheme from './theme';

import { STORY_RENDERED, STORY_MISSING, STORY_ERRORED } from '@storybook/core-events';
import { renderLabel } from './render-label';

import '../packages/themes/src/default.css';
import { setManagerMetricsConnection } from './addons/utils';

if (process.env.NODE_ENV !== 'development') {
    setManagerMetricsConnection();
}

addons.register('TitleAddon', (api) => {
    const libName = 'Core Components';
    let interval = null;
    const setTitle = () => {
        clearTimeout(interval);
        let storyData = null;
        try {
            storyData = api.getCurrentStoryData();
        } catch (e) {}
        let title;
        if (!storyData) {
            title = libName;
        } else {
            let kind = storyData.kind;
            kind = kind.replace('Components/', '');
            kind = kind.includes('|') ? kind.match(/\|(.*)/)[1] : kind;

            let name = storyData.name;
            name = name === 'Page' ? '' : name;

            let storyTitle = kind || name;

            title = `${storyTitle} ⋅ ${libName}`;
        }
        if (document.title !== title) {
            document.title = title;
        }
        interval = setTimeout(setTitle, 100);
    };
    setTitle();
    api.on(STORY_RENDERED, (story) => {
        setTitle();
    });
});

addons.register('RedirectAddon', (api) => {
    const redirectTo = process.env.NODE_ENV === 'development' ? '/' : window.location.pathname;

    api.on(STORY_MISSING, () => {
        window.location.href = redirectTo;
    });
    api.on(STORY_ERRORED, () => {
        window.location.href = redirectTo;
    });
});

addons.setConfig({
    theme: alfaTheme,
    sidebar: {
        renderLabel,
    },
});
