import { calcGeneratorDuration, type KeyframeGenerator, maxGeneratorDuration } from 'motion';

export function sampleGenerator(generator: KeyframeGenerator<number>, resolution = 10) {
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
