import React, {
    createContext,
    type Dispatch,
    type ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';

import { type CardData } from './types';

interface AccountSelectContextValue {
    step: number;
    setStep: Dispatch<React.SetStateAction<number>>;
    cardNumber: CardData['number'];
    setCardNumber: Dispatch<React.SetStateAction<CardData['number']>>;
    cardExpiry: CardData['expiryDate'];
    setCardExpiry: Dispatch<React.SetStateAction<CardData['expiryDate']>>;
    cardCvc: string;
    setCardCvc: Dispatch<React.SetStateAction<string>>;
}

interface ErrorContextValue {
    error: string | null;
    setError: Dispatch<React.SetStateAction<string | null>>;
}

export const AccountSelectContext = createContext<AccountSelectContextValue | null>(null);

export const ErrorContext = createContext<ErrorContextValue | null>(null);

export const AccountSelectContextProvider = ({ children }: { children: ReactNode }) => {
    const [step, setStep] = useState<number>(1);
    const [cardNumber, setCardNumber] = useState<CardData['number']>('');
    const [cardExpiry, setCardExpiry] = useState<CardData['expiryDate']>('');
    const [cardCvc, setCardCvc] = useState<string>('');

    const ctx = useMemo(
        () => ({
            step,
            setStep,
            cardNumber,
            setCardNumber,
            cardExpiry,
            setCardExpiry,
            cardCvc,
            setCardCvc,
        }),
        [cardCvc, cardExpiry, cardNumber, step],
    );

    return <AccountSelectContext.Provider value={ctx}>{children}</AccountSelectContext.Provider>;
};

export const useAccountSelect = () => {
    const ctx = useContext(AccountSelectContext);

    if (!ctx) {
        throw new Error('useAccountSelect must be used within a AccountSelectContextProvider');
    }

    return ctx;
};

export const useError = () => {
    const ctx = useContext(ErrorContext);

    if (!ctx) {
        throw new Error('useError must be used within a ErrorContext.Provider');
    }

    return ctx;
};
