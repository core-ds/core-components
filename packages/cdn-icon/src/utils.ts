export const buildIconUrl = (iconName: unknown, iconBaseUrl: string): string | null => {
    if (typeof iconName !== 'string') {
        return null;
    }

    const trimmedName = iconName.trim();
    const hasAlphaNumeric = /[a-z0-9]/i.test(trimmedName);

    if (!trimmedName || !hasAlphaNumeric) {
        return null;
    }

    return `${iconBaseUrl}/${trimmedName}.svg`;
};
