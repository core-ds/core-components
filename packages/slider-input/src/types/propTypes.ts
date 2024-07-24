import { ChangeEvent, FocusEvent } from 'react';

export type OnChangeType = (
    event: ChangeEvent<HTMLInputElement> | FocusEvent | null,
    payload: { value: number | '' },
) => void;

export type OnInputChangeType = (
    event: ChangeEvent<HTMLInputElement> | FocusEvent,
    payload: { value: number | '' },
) => void;
