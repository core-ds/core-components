/**
 * @param {string} id
 */
export function matchCoreComponentsModule(id) {
    return id.match(/^(@alfalab\/core-components-[^/]+)\/?(.*)$/);
}
