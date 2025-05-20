/**
 * Преобразует строку цвета из формата ARGB в формат RGBA для CSS.
 * @param color Цвет в формате "#AARRGGBB"
 * @returns Цвет в формате "rgba(r, g, b, a)" для использования в CSS
 */
export function modifyColor(color: string): string {
    // Проверяем формат #AARRGGBB (8 символов с решеткой)
    if (color.startsWith('#') && color.length === 9) {
        // Извлекаем компоненты цвета
        const alpha = parseInt(color.slice(1, 3), 16) / 255; // Преобразуем A в десятичное значение от 0 до 1
        const red = parseInt(color.slice(3, 5), 16);
        const green = parseInt(color.slice(5, 7), 16);
        const blue = parseInt(color.slice(7, 9), 16);

        // Возвращаем цвет в формате rgba
        return `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(2)})`;
    }

    return color;
}
