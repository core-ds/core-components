import React from 'react';
import { CalendarWithSkeleton } from '@alfalab/core-components-calendar-with-skeleton';
import { Button } from '@alfalab/core-components-button';
import { CalendarInput } from '@alfalab/core-components-calendar-input';
import { CalendarRange } from '@alfalab/core-components-calendar-range';
import { Wrapper } from './Wrapper';

const CalendarWithSkeletonExample = () => {
    const [visible, setVisible] = React.useState(false);
    return (
        <React.Fragment>
            <Wrapper>
                <CalendarWithSkeleton calendarVisible={visible} />

                <Button size='xs' onClick={() => setVisible(!visible)}>
                    toggle
                </Button>
            </Wrapper>

            <Wrapper description='Использование с другими компонентами'>
                <CalendarInput
                    Calendar={CalendarWithSkeleton}
                    calendarProps={{ calendarVisible: false }}
                />
                <CalendarRange
                    inputFromProps={{
                        Calendar: CalendarWithSkeleton,
                        disabled: true,
                        calendarProps: { calendarVisible: false },
                    }}
                />
            </Wrapper>
        </React.Fragment>
    );
};

export default CalendarWithSkeletonExample;
