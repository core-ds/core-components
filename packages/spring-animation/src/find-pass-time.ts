import { type KeyframeGenerator } from 'motion';

const resolution = 10;

export function findPassTime(
    generator: KeyframeGenerator<number>,
    duration: number,
    value: number,
) {
    const from = generator.next(0).value;
    const direction = Math.sign(generator.next(duration).value - from);
    let elapsed = 0;

    while (elapsed < duration && (generator.next(elapsed).value - value) * direction < 0) {
        elapsed += resolution;
    }

    return Math.min(elapsed, duration);
}
