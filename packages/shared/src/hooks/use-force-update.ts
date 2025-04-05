import { useReducer } from 'react';

const reducer = (): number | object => ({});

export function useForceUpdate(): () => void {
    const [, dispatch] = useReducer(reducer, 0);

    return dispatch;
}
