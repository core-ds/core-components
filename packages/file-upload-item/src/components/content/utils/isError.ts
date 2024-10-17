export const isError = (error?: string | string[]) => {
    if (typeof error === 'string' && error.length > 0) {
        return true;
    }

    if (Array.isArray(error) && error.length > 0) {
        return true;
    }

    return false;
};
