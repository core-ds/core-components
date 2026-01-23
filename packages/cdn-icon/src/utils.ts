export const buildIconUrl = (iconName: string, iconBaseUrl: string): string | null => {
    const trimmedName = iconName.trim();
    const hasAlphaNumeric = /[a-z0-9]/i.test(trimmedName);

    if (!trimmedName || !hasAlphaNumeric) {
        return null;
    }

    return `${iconBaseUrl}/${trimmedName}.svg`;
};
