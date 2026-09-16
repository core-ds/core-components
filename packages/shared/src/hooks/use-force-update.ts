import { useReducer } from 'react';

const reducer = (): number | unknown[] => [];

export function useForceUpdate(): VoidFunction {
    const [, dispatch] = useReducer(reducer, 0);

    return dispatch;
}
