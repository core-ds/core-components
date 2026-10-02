/**
 * Объединяет все top-level правила `:root` в одно, дедуплицируя свойства
 * (побеждает последнее значение в исходном порядке — каскад не меняется).
 *
 * Каждый компонент инлайнит базовые токены + свои алиасы отдельными блоками
 * `:root`, поэтому в собранном CSS их получается много. Они наследуются в
 * каждый узел, и DevTools перерисовывает каждый блок при выборе/наведении —
 * панель Styles начинает тормозить. Слияние сокращает число блоков (это же
 * делает минификатор в проде), не меняя ни одного разрешённого значения.
 *
 * Затрагивает только top-level `:root` — блоки внутри `@media`/др. at-rules не
 * трогаются, чтобы не нарушить их область видимости.
 *
 * @returns {import('postcss').Plugin}
 */
const postcssMergeRoots = () => ({
    postcssPlugin: 'postcss-merge-roots',
    OnceExit: (root) => {
        const roots = [];
        root.each((node) => {
            if (node.type === 'rule' && node.selector.trim() === ':root') {
                roots.push(node);
            }
        });

        if (roots.length < 2) {
            return;
        }

        const byProp = new Map();
        for (const rule of roots) {
            rule.walkDecls((decl) => byProp.set(decl.prop, decl.clone()));
        }

        const first = roots[0];
        first.removeAll();
        for (const decl of byProp.values()) {
            first.append(decl);
        }
        for (let i = 1; i < roots.length; i += 1) {
            roots[i].remove();
        }
        if (first.nodes.length === 0) {
            first.remove();
        }
    },
});

module.exports = postcssMergeRoots;
