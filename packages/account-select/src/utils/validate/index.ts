export const validateCardNumber = (value: string) => value.replace(/\s/g, '').length === 16;

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

export const validateCvv = (value: string) => value.length === 3;
