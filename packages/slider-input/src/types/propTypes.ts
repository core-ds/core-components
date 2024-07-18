import { ChangeEvent } from 'react';

export type OnChangeType = (
    event: ChangeEvent<HTMLInputElement> | null,
    payload: { value: number | '' },
) => void;

export type OnInputChangeType = (
    event: ChangeEvent<HTMLInputElement>,
    payload: { value: number | '' },
) => void;
