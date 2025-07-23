/**
 * @template T
 * @param {T} val
 * @returns {val is NonNullable<T>}
 */
function isNonNullable(val) {
    return val != null;
}

module.exports = { isNonNullable };
