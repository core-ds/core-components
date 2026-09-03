const isNumericString = (str: string) => /^\d+$/.test(str);

export const validateCardNumber = (value: string): boolean => {
    const digits = value.replace(/\s/g, '');

    return digits.length === 16 && isNumericString(digits);
};

export const validateExpiry = (value: string): boolean => {
    if (value.length !== 5) return false;

    const [month, year] = value.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    return (
        monthNum >= 1 &&
        monthNum <= 12 &&
        yearNum >= currentYear &&
        (yearNum > currentYear || monthNum >= currentMonth)
    );
};

export const validateCVC = (value: string | number | undefined): boolean => {
    if (value === undefined) return false;
    const str = String(value);

    return str.length === 3 && isNumericString(str);
};
