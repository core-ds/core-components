import React from 'react';
import { Space } from '@alfalab/core-components-space';
import { DateInput, DateInputProps } from '@alfalab/core-components-date-input';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';

const DateInputExample = () => {
    const [value, setValue] = React.useState('30.12.2005');

    const handleChange: DateInputProps['onChange'] = (event, { value }) => setValue(value);

    return (
        <Wrapper>
            <Space>
                <DateInput value={value} onChange={handleChange} label='Дата регистрации' />

                <Space direction='horizontal'>
                    <Button size='xxs' type='button' onClick={() => setValue('')}>
                        Сбросить
                    </Button>
                    <Button size='xxs' type='button' onClick={() => setValue('30.01.2005')}>
                        Установить 30.01.2005
                    </Button>
                    <Button size='xxs' type='button' onClick={() => setValue('30.02.2005')}>
                        Установить некорректное значение
                    </Button>
                </Space>

                <div />
            </Space>
        </Wrapper>
    );
};

export default DateInputExample;
