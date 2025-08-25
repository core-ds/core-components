/**
 * Трансформирует размер файла в человеко-читаемый формат
 * 2097152 => 2mb
 */
export const humanFileSize = (size: string | number) => {
    const units = ['Б', 'КБ', 'МБ', 'ГБ'];

    let humanSize: string | number = Number(size);
    let factor = 0;

    while (humanSize >= 1024 && factor < units.length - 1) {
        humanSize /= 1024;
        factor += 1;
    }

    humanSize = humanSize.toFixed(2);

    return `${Number(humanSize)} ${units[factor]}`;
};
