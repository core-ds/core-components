export function splitFilename(filename: string): [string, string] {
    const dotPosition = filename.lastIndexOf('.');

    let head = filename;
    let tail = '';

    if (dotPosition > 0) {
        head = filename.slice(0, dotPosition);
        tail = filename.slice(dotPosition);
    }

    return [head, tail];
}
