/**
 * @template T
 * @param {T} val
 * @returns {val is NonNullable<T>}
 */
function isNonNullable(val) {
    return val != null;
}

/**
 * @template T
 * @param {T} val
 * @returns {val is T & (null | undefined)}
 */
function isNullable(val) {
    return !isNonNullable(val);
}

/**
 * @param {string} text
 */
function unquote(text) {
    return text.replace(/(['"])(.*)(\1)/, '$2');
}

module.exports = { isNonNullable, isNullable, unquote };
