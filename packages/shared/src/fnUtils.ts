/**
 * Возвращает true, если значение равно null или undefined
 */
function isNil(value: unknown) {
    return value == null;
}

export const fnUtils = {
    isNil,
};
