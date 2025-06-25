import { createContext, useContext } from 'react';

export const AccountSelectContext = createContext<{
    setError: (error: string | null) => void;
}>({
    setError: () => {},
});

export const useAccountSelectContext = () => useContext(AccountSelectContext);
