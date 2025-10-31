import { execa } from 'execa';

/**
 * @param {string} file
 * @param {string[]} args
 * @param {import('execa').Options} [options]
 */
export function $(
    file,
    args,
    options = {
        preferLocal: true,
        stdio: 'inherit',
    },
) {
    return execa(file, args, options);
}
