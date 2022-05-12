export const generateId = (date: Date) => {
    return `month-${date.getMonth()}_year-${date.getFullYear()}`;
};
