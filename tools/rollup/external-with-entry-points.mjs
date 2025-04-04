/**
 *  Добавляем все entryPoints кор-компонентов в externals
 *  plugin wildcard-external делает это только для js файлов уже после транспиляции ts.
 *  Если этого не сделать, то плагин для ts не будет понимать, что зависимости @balafla/core-components-`*`/shared и др являются внешними и будет дублировать их в каждом пакете
 */
export function externalsWithEntryPoints(depsArr) {
    return depsArr.reduce((acc, dep) => {
        if (dep.startsWith('@balafla/core-components-')) {
            acc.push(dep, dep + '/mobile', dep + '/desktop', dep + '/shared');
        } else {
            acc.push(dep);
        }

        return acc;
    }, []);
}
