import React from 'react';
import { Calendar } from '@alfalab/core-components-calendar';
import { Wrapper } from './Wrapper';

const CalendarExample = () => {
    const [value, setValue] = React.useState<number>();

    return (
        <Wrapper>
            <Calendar value={value} onChange={setValue} />
        </Wrapper>
    );
};

export default CalendarExample;
