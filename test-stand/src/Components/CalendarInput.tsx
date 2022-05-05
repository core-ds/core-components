import React from 'react';
import { Button } from '@alfalab/core-components-button';
import { CalendarInput, CalendarInputProps } from '@alfalab/core-components-calendar-input';
import { Space } from '@alfalab/core-components-space';
import { Wrapper } from './Wrapper';

const CalendarInputExample = () => {
    const [inputValue, setValue] = React.useState('');

    const handleChange: CalendarInputProps['onChange'] = (event, { value }) => setValue(value);

    return (
        <Wrapper>
            <Space>
                <CalendarInput
                    value={inputValue}
                    onChange={handleChange}
                    label='Дата регистрации'
                />
                <Button type='button' onClick={() => setValue('')}>
                    Reset
                </Button>
            </Space>
        </Wrapper>
    );
};

export default CalendarInputExample;
