import React from 'react';
import { RadioGroup, RadioGroupProps } from '@alfalab/core-components-radio-group';
import { Radio } from '@alfalab/core-components-radio';
import { Wrapper } from './Wrapper';

const RadioGroupExample = () => {
    const [value, setValue] = React.useState<string | undefined>('one');

    const onChange: RadioGroupProps['onChange'] = (_, payload) => {
        setValue(payload?.value);
    };

    return (
        <Wrapper>
            <RadioGroup
                label='Заголовок группы'
                direction='vertical'
                name='radioGroup'
                onChange={onChange}
                value={value}
            >
                <Radio label='Первый вариант' value='one' />
                <Radio label='Второй вариант' value='two' />
                <Radio label='Третий вариант' value='three' />
            </RadioGroup>
        </Wrapper>
    );
};

export default RadioGroupExample;
