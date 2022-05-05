import React from 'react';
import { Checkbox } from '@alfalab/core-components-checkbox';
import { CheckboxGroup, CheckboxGroupProps } from '@alfalab/core-components-checkbox-group';
import { Wrapper } from './Wrapper';

const CheckboxGroupExample = () => {
    const [value, setValue] = React.useState({ one: false, two: false, three: false });

    const onChange: CheckboxGroupProps['onChange'] = (_, payload) => {
        if (payload?.name) {
            setValue({ ...value, [payload.name]: payload.checked });
        }
    };

    return (
        <Wrapper>
            <CheckboxGroup label='Заголовок группы' onChange={onChange}>
                <Checkbox label='Первый вариант' name='one' checked={value.one} />
                <Checkbox label='Второй вариант' name='two' checked={value.two} />
                <Checkbox label='Третий вариант' name='three' checked={value.three} />
            </CheckboxGroup>
        </Wrapper>
    );
};

export default CheckboxGroupExample;
