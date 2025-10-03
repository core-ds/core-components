export const getMaskedCardNumber = (value: string) => {
    if (!value || value.length < 16) return value;
    const cleanValue = value.replace(/\s/g, '');
    const lastFour = cleanValue.slice(-4);

    return `··${lastFour}`;
};

export const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\s/g, '');

    return cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
};
