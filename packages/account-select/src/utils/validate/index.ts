const isNumericString = (str: string) => /^\d+$/.test(str);

export const validateCardNumber = (value: string) => value.length === 16 && isNumericString(value);

export const validateExpiry = (value: string) => {
    if (value.length !== 5) return false;
    const [month, year] = value.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    return (
        monthNum >= 1 &&
        monthNum <= 12 &&
        yearNum >= currentYear &&
        (yearNum > currentYear || monthNum >= currentMonth)
    );
};

export const validateCvv = (value: string | number | undefined) => {
    if (typeof value === 'number') return value.toString().length === 3;

    return value?.length === 3 && isNumericString(value);
};
