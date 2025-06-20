/**
 * Преобразует строку цвета из формата ARGB в формат RGBA для CSS.
 * @param color Цвет в формате "#AARRGGBB"
 * @returns Цвет в формате "rgba(r, g, b, a)" для использования в CSS
 */
export function modifyColor(color: string): string {
    if (!/^#([0-9a-fA-F]){8}$/.test(color)) {
        return color;
    }

    const matches = color.match(/([0-9a-fA-F]{2})/g);

    if (!matches) {
        return color;
    }

    const [alpha, red, green, blue] = matches.map((s) => parseInt(s, 16));

    return `rgba(${red}, ${green}, ${blue}, ${(alpha / 255).toFixed(2)})`;
}
