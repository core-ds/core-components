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
    error: string | null;
    setError: Dispatch<React.SetStateAction<string | null>>;
    step: number;
    setStep: Dispatch<React.SetStateAction<number>>;
    cardNumber: CardData['number'];
    setCardNumber: Dispatch<React.SetStateAction<CardData['number']>>;
    cardExpiry: CardData['expiryDate'];
    setCardExpiry: Dispatch<React.SetStateAction<CardData['expiryDate']>>;
    cardCvc: string;
    setCardCvc: Dispatch<React.SetStateAction<string>>;
}

export const AccountSelectContext = createContext<AccountSelectContextValue | null>(null);

export const AccountSelectContextProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<number>(1);
    const [cardNumber, setCardNumber] = useState<CardData['number']>('');
    const [cardExpiry, setCardExpiry] = useState<CardData['expiryDate']>('');
    const [cardCvc, setCardCvc] = useState<string>('');

    const ctx = useMemo(
        () => ({
            error,
            setError,
            step,
            setStep,
            cardNumber,
            setCardNumber,
            cardExpiry,
            setCardExpiry,
            cardCvc,
            setCardCvc,
        }),
        [cardCvc, cardExpiry, cardNumber, error, step],
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
