import React, { useCallback, useState } from 'react';
import addons, { types } from '@storybook/addons';
import { Form } from '@storybook/components';
import { setModeVars, MODES, setModeVarsInMobileFrame } from './utils';
import { getStoryDoc } from '../utils';

export const ADDON_ID = 'mode-switcher';

const createModeChangeEvent = (newMode) =>
    new CustomEvent('mode-change', { bubbles: true, detail: { mode: newMode } });

const Addon = () => {
    const [mode, setMode] = useState('light');

    const handleChange = useCallback((event) => {
        const newMode = event.target.value;

        setMode(newMode);

        setModeVars(newMode);
        setModeVarsInMobileFrame(newMode);

        const modeChangeEvent = createModeChangeEvent(newMode);

        document.body.dispatchEvent(modeChangeEvent);
        getStoryDoc().body.dispatchEvent(modeChangeEvent);
    }, []);

    return (
        <div className='tool'>
            <Form.Select
                id='storybook-mode-switcher'
                size={1}
                onChange={handleChange}
                className='select'
                value={mode}
            >
                {MODES.map((mode) => (
                    <option value={mode} key={mode}>
                        {mode}
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
        paramKey: ADDON_ID,
    });
});
