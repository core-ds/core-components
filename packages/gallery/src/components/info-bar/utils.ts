export const formatDate = (isoString: string | undefined) => {
    if (!isoString) return null;

    const date = new Date(isoString);

    return date.toLocaleDateString('ru-RU');
};
