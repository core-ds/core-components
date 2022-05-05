import React from 'react';
import { startOfDay, subMonths, addMonths, startOfMonth } from 'date-fns';
import { parseDateString, formatDate } from '@alfalab/core-components-calendar-input';
import { Space } from '@alfalab/core-components-space';
import { RadioGroup } from '@alfalab/core-components-radio-group';
import { Radio } from '@alfalab/core-components-radio';
import { Button } from '@alfalab/core-components-button';
import { CalendarRange, CalendarRangeProps } from '@alfalab/core-components-calendar-range';
import { Wrapper } from './Wrapper';

const CalendarRangeExample = () => {
    const [calendarPosition, setCalendarPosition] = React.useState<string | undefined>('static');

    const defaultDate = parseDateString('10.03.2022');
    const [valueFrom, setValueFrom] = React.useState<{ value: string; date: number | Date | null }>(
        {
            value: '',
            date: null,
        },
    );
    const [valueTo, setValueTo] = React.useState<{ value: string; date: number | Date | null }>({
        value: '',
        date: null,
    });

    const minDate = subMonths(startOfDay(defaultDate), 3).getTime();
    const maxDate = addMonths(startOfDay(defaultDate), 3).getTime();

    return (
        <Wrapper>
            <Space size='l'>
                <RadioGroup
                    label='calendarPosition'
                    direction='horizontal'
                    onChange={(_, payload) => setCalendarPosition(payload?.value)}
                    value={calendarPosition}
                >
                    <Radio label='static' value='static' />
                    <Radio label='popover' value='popover' />
                </RadioGroup>

                <CalendarRange
                    valueFrom={valueFrom.value}
                    valueTo={valueTo.value}
                    minDate={minDate}
                    maxDate={maxDate}
                    defaultMonth={startOfMonth(defaultDate).getMonth()}
                    offDays={[startOfDay(defaultDate)]}
                    calendarPosition={calendarPosition as CalendarRangeProps['calendarPosition']}
                    onChange={({ valueFrom, valueTo, dateFrom, dateTo }) => {
                        setValueFrom({ value: valueFrom, date: dateFrom });
                        setValueTo({ value: valueTo, date: dateTo });
                    }}
                />

                <span>
                    Values: {valueFrom.value} — {valueTo.value}
                    <br />
                    Dates: {valueFrom.date && formatDate(valueFrom.date)} —{' '}
                    {valueTo.date && formatDate(valueTo.date)}
                </span>

                <Space direction='horizontal'>
                    <Button
                        size='xxs'
                        type='button'
                        onClick={() => setValueFrom({ value: '', date: null })}
                    >
                        Сбросить начало
                    </Button>
                    <Button
                        size='xxs'
                        type='button'
                        onClick={() => setValueTo({ value: '', date: null })}
                    >
                        Сбросить конец
                    </Button>

                    <Button
                        size='xxs'
                        type='button'
                        onClick={() =>
                            setValueFrom({
                                value: '20.02.2022',
                                date: parseDateString('20.02.2022'),
                            })
                        }
                    >
                        Начало 20.02.2022
                    </Button>
                    <Button
                        size='xxs'
                        type='button'
                        onClick={() =>
                            setValueTo({ value: '25.04.2022', date: parseDateString('25.04.2022') })
                        }
                    >
                        Конец 25.04.2022
                    </Button>
                </Space>
            </Space>
        </Wrapper>
    );
};

export default CalendarRangeExample;
