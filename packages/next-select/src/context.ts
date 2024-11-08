import { createContext, useContext } from 'react';

import { SelectAction, SelectState } from './hooks';
import { Store } from './nano-redux';
import { BaseValueType } from './types';

export const SelectStoreContext = createContext<Store<SelectState<any>, SelectAction<any>> | null>(
    null,
);

export const useSelectStore = () =>
    useContext(SelectStoreContext) as Store<
        SelectState<BaseValueType>,
        SelectAction<BaseValueType>
    >;
