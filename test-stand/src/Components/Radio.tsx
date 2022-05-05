import React from 'react';
import { Radio } from '@alfalab/core-components-radio';
import { Wrapper } from './Wrapper';

const RadioExample = () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => setChecked(!checked);

    return (
        <Wrapper>
            <Radio
                onChange={handleChange}
                checked={checked}
                hint='Описание пункта'
                label='Вариант выбора у радиобатона'
            />
        </Wrapper>
    );
};

export default RadioExample;
