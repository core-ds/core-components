import { CurrencyCodes } from '@alfalab/data';

export const logWarning = (currency?: CurrencyCodes) => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    if (currency && currency === 'RUR') {
        // eslint-disable-next-line no-console
        console.warn(
            `@alfalab/core-components/amount: currency='${currency}' - @deprecated. Используйте 'RUB'`,
        );
    }
};
