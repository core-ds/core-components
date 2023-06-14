import React, { FC, ReactNode, Ref } from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Input } from '@alfalab/core-components-input';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

type DayInputFieldProps = {
    inputWrapperRef: Ref<HTMLDivElement> | undefined;
    value: number | string;
    handleToggle: () => void;
    error?: ReactNode;
    hint?: ReactNode;
};
export const DayInputField: FC<DayInputFieldProps> = ({
    inputWrapperRef,
    value,
    handleToggle,
    error,
    hint,
}) => (
    <Input
        dataTestId='day-input-field'
        wrapperRef={inputWrapperRef}
        value={`${value === 31 ? 'В последний день месяца' : value}`}
        block={true}
        readOnly={true}
        onClick={handleToggle}
        label='Какого числа'
        size='m'
        error={error}
        rightAddons={<IconButton view='primary' icon={CalendarMIcon} size='s' dataTestId='icon' />}
        hint={hint}
    />
);
