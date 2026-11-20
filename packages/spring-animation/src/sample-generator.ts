import { calcGeneratorDuration, type KeyframeGenerator, maxGeneratorDuration } from 'motion';

const resolution = 10;

export function sampleGenerator(generator: KeyframeGenerator<number>) {
    const duration = Math.min(
        generator.calculatedDuration ?? calcGeneratorDuration(generator),
        maxGeneratorDuration,
    );
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    const values = Array.from(
        { length: numPoints },
        (_, i) => generator.next((duration * i) / (numPoints - 1)).value,
    );

    return { values, duration };
}
