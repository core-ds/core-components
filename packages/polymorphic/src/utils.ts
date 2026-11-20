export function passCustomProps<T>(
    customProps: T | undefined,
): { customProps: NonNullable<T> } | null {
    return customProps ? { customProps } : null;
}
