import { Reducer } from 'react';

export { Reducer, Dispatch } from 'react';

export interface Store<State, Action> {
    dispatch: (action: Action) => void;
    getState: () => State;
    subscribe: (listener: () => void) => () => void;
}

export function createStore<State, Action>(
    reducer: Reducer<State, Action>,
    initialState: State,
): Store<State, Action> {
    let state = initialState;
    const listeners = new Set<() => void>();

    return {
        dispatch: (action) => {
            state = reducer(state, action);
            listeners.forEach((listener) => {
                listener();
            });
        },
        subscribe: (listener) => {
            listeners.add(listener);

            return () => {
                listeners.delete(listener);
            };
        },
        getState: () => state,
    };
}

export interface Action<Type extends string | number, Payload = null> {
    type: Type;
    payload: Payload;
}
