import React, { useState } from 'react';
import { addons, types } from '@storybook/manager-api';
import { Form } from '@storybook/components';
import { getStoryDoc } from '../utils';

export const ADDON_ID = 'theme-switcher';

const THEMES = ['default', 'click', 'corp', 'mobile', 'site', 'intranet'];

const createThemeChangeEvent = (newTheme) =>
    new CustomEvent('theme-change', { bubbles: true, detail: { theme: newTheme } });

const Addon = () => {
    const [theme, setTheme] = useState('default');

    const handleChange = (event) => {
        const newTheme = event.target.value;
        const themeChangeEvent = createThemeChangeEvent(newTheme);

        setTheme(newTheme);
        document.body.dispatchEvent(themeChangeEvent);
        getStoryDoc().body.dispatchEvent(themeChangeEvent);
    };

    return (
        <div className='tool'>
            <span className='label'>Выбор темы: </span>
            <Form.Select
                id='storybook-theme-switcher'
                size={1}
                onChange={handleChange}
                className='select'
                value={theme}
            >
                {THEMES.map((themeName) => (
                    <option value={themeName} key={themeName}>
                        {themeName}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};

addons.register(ADDON_ID, () => {
    addons.add(ADDON_ID, {
        type: types.TOOL,
        match: () => true,
        render: () => <Addon />,
    });
});
