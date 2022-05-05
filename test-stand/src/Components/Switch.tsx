import React from 'react';
import { Switch } from '@alfalab/core-components-switch';
import { Wrapper } from './Wrapper';

const SwitchExample = () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => setChecked(!checked);

    return (
        <Wrapper>
            <Switch
                checked={checked}
                label='Условие тоггла'
                hint='Описание пункта'
                onChange={handleChange}
            />
        </Wrapper>
    );
};

export default SwitchExample;
