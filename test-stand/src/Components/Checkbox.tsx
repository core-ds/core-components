import React from 'react';
import { Checkbox } from '@alfalab/core-components-checkbox';
import { Wrapper } from './Wrapper';

const CheckboxExample = () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => setChecked(!checked);

    return (
        <Wrapper>
            <Checkbox
                onChange={handleChange}
                checked={checked}
                label='Согласен с условиями'
                hint='Соглашайтесь, будьте любезны'
            />
        </Wrapper>
    );
};

export default CheckboxExample;
