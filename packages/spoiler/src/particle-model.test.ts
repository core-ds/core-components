import { createParticleGroups, type Particle } from './particle-model';

describe('Плотность частиц Spoiler', () => {
    it.each([
        { width: 150, height: 150 },
        { width: 240, height: 80 },
    ])('прореживает все четыре края блока $width × $height', ({ width, height }) => {
        const rects = [{ x: 0, y: 0, width, height }];
        const [uniform] = createParticleGroups(rects, 16, 0, 'text');
        const [element] = createParticleGroups(rects, 16, 0, 'element');
        const edges = [
            (particle: Particle) => particle.cloudX < 12,
            (particle: Particle) => particle.cloudX > width - 12,
            (particle: Particle) => particle.cloudY < 12,
            (particle: Particle) => particle.cloudY > height - 12,
        ];

        edges.forEach((isAtEdge) => {
            expect(element.filter(isAtEdge).length).toBeGreaterThan(0);
            expect(element.filter(isAtEdge).length).toBeLessThan(uniform.filter(isAtEdge).length);
        });
        expect(createParticleGroups(rects, 16, 0, 'element')).toEqual([element]);
    });

    it.each([
        { width: 150, height: 150, edgeWidth: 12 },
        { width: 16, height: 16, edgeWidth: 4 },
        { width: 1000, height: 1000, edgeWidth: 12 },
    ])(
        'сохраняет плотность и свойства точек в центре блока $width × $height',
        ({ width, height, edgeWidth }) => {
            const rects = [{ x: 0, y: 0, width, height }];
            const [uniform] = createParticleGroups(rects, 16, 0, 'text');
            const [element] = createParticleGroups(rects, 16, 0, 'element');
            const isInCenter = (particle: Particle) =>
                particle.cloudX >= edgeWidth &&
                particle.cloudX <= width - edgeWidth &&
                particle.cloudY >= edgeWidth &&
                particle.cloudY <= height - edgeWidth;
            const center = uniform.filter(isInCenter);

            expect(center.length).toBeGreaterThan(0);
            expect(element.filter(isInCenter)).toEqual(center);
            expect(element.length).toBeLessThanOrEqual(5000);
        },
    );
});
