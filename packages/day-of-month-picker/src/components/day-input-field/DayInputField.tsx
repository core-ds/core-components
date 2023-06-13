import React, { FC, Ref } from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Input } from '@alfalab/core-components-input';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

type DayInputFieldProps = {
    inputWrapperRef: Ref<HTMLDivElement> | undefined;
    value: number;
    handleToggle: () => void;
};
export const DayInputField: FC<DayInputFieldProps> = ({ inputWrapperRef, value, handleToggle }) => (
    <Input
        wrapperRef={inputWrapperRef}
        value={`${value === 31 ? 'В последний день месяца' : value}`}
        block={true}
        readOnly={true}
        onClick={handleToggle}
        label='Какого числа'
        size='m'
        rightAddons={<IconButton view='primary' icon={CalendarMIcon} size='s' dataTestId='icon' />}
    />
);
