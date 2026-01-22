const ICON_NAME_PATTERN = /^[a-z0-9][a-z0-9_-]*(?:\/[a-z0-9][a-z0-9_-]*)*$/i;

export const buildIconUrl = (iconName: string, iconBaseUrl: string): string | null => {
    const trimmedName = iconName.trim();

    if (!trimmedName || !ICON_NAME_PATTERN.test(trimmedName)) {
        return null;
    }

    return `${iconBaseUrl}/${trimmedName}.svg`;
};
