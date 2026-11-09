const { purgeCSSPlugin } = require('@fullhuman/postcss-purgecss');

/**
 * PurgeCSS не учитывает обращения к переменным внутри keyframes.
 * Сохраняем эти переменные и их зависимости перед удалением неиспользуемых токенов.
 *
 * @returns {import('postcss').Plugin}
 */
const postcssPurgeUnusedVars = () => ({
    postcssPlugin: 'postcss-purge-unused-vars',
    OnceExit(root, helpers) {
        const variables = new Set();
        const declarations = new Map();

        const collectVariables = (value) => {
            for (const [, variable] of value.matchAll(/var\(\s*(--[\w-]+)/g)) {
                variables.add(variable);
            }
        };

        root.walkAtRules(/keyframes$/, (rule) => {
            rule.walkDecls((declaration) => collectVariables(declaration.value));
        });

        root.walkDecls(/^--/, ({ prop, value }) => {
            const values = declarations.get(prop) ?? [];

            values.push(value);
            declarations.set(prop, values);
        });

        // Обход Set включает добавленные зависимости и завершается даже при циклических ссылках.
        for (const variable of variables) {
            for (const value of declarations.get(variable) ?? []) {
                collectVariables(value);
            }
        }

        return purgeCSSPlugin({
            variables: true,
            // Удаляем только неиспользуемые переменные, сохраняя все селекторы.
            safelist: { standard: [/.*/], variables: [...variables] },
        }).OnceExit(root, helpers);
    },
});

module.exports = postcssPurgeUnusedVars;
