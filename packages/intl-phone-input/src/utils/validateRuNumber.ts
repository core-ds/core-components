export const validateRuNumber = (value: string) =>
    value[0] === '7' || value[0] === '8' || value.substring(0, 2) === '+7';
