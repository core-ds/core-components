/**
 * Преобразует kebab-case строку в PascalCase.
 * Части, входящие в acronyms, переводятся в верхний регистр целиком,
 * остальные — капитализируются по первой букве
 */
export function toPascalCase(input, acronyms = new Set()) {
    return input
        .split('-')
        .map((part) =>
            acronyms.has(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1),
        )
        .join('');
}
