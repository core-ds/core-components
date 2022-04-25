/**
 * Игнорирует импорты css-модулей
 * import styles from './index.module.css'; —> var styles = require("./index.module.css");
 */
export default function ignoreCss() {
    return {
        name: 'ignore-css',
        transform(_, id) {
            if (id.includes('.module.css')) {
                // Достаем путь до импорта и добавляем require
                const { source } = this.getModuleInfo(id).meta;

                return `export default require("${source}")`;
            }

            return null;
        },
        async resolveId(source, importer, options) {
            if (source.includes('.module.css')) {
                // Сначала резолвим импорт css-модуля
                const resolution = await this.resolve(source, importer, {
                    skipSelf: true,
                    ...options,
                });

                return {
                    id: resolution.id,
                    // Запоминаем путь оригинального файла
                    meta: { source },
                };
            }

            return null;
        },
    };
}
