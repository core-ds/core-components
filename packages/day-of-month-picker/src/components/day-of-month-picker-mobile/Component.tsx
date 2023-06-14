import React, { forwardRef, useRef, useState } from 'react';

import { BottomSheet } from '@alfalab/core-components-bottom-sheet';

import { DayOfMontPickerDesktopProps } from '../../Component.desktop';
import { DayInputField } from '../day-input-field/DayInputField';
import { DaysTable } from '../days-table';

export const DayOfMonthPickerMobile = forwardRef<HTMLDivElement, DayOfMontPickerDesktopProps>(
    ({ className, value, onChange, dataTestId, error, hint }, ref) => {
        const [show, setShow] = useState(false);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const handleToggle = () => {
            setShow((prev) => !prev);
        };

        const handleChangeDay = (day: number) => {
            onChange(day);
            setShow(false);
        };

        return (
            <React.Fragment>
                <DayInputField
                    inputWrapperRef={inputWrapperRef}
                    value={value ?? ''}
                    handleToggle={handleToggle}
                    error={error}
                    hint={hint}
                />
                <BottomSheet
                    open={show}
                    onClose={() => setShow(false)}
                    className={className}
                    title='Какого числа'
                    stickyHeader={true}
                    hasCloser={true}
                    ref={ref}
                    dataTestId={dataTestId}
                >
                    <DaysTable selectedDay={value} onClick={handleChangeDay} />
                </BottomSheet>
            </React.Fragment>
        );
    },
);
