export const trimTrailingZeros = (minor: string) => {
    const regex = /.*([1-9])[0-9]*$/;

    const match = minor.match(regex);

    if (match) {
        return minor.substring(0, minor.lastIndexOf(match[1]) + 1);
    }

    return minor;
};
