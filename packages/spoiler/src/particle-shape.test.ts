import { createParticleGroups } from './particle-model';
import { constrainToShape, createElementShape, getShapeInset } from './particle-shape';

const rect = { x: 0, y: 0, width: 150, height: 150 };
const radiusStyle = (value: string) =>
    ({
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
        borderBottomLeftRadius: value,
    }) as CSSStyleDeclaration;

describe('Форма маски Spoiler', () => {
    it('разрешает проценты по каждой оси и учитывает толщину рамки', () => {
        const circle = createElementShape(rect, radiusStyle('50%'));
        const oval = createElementShape({ ...rect, width: 240, height: 80 }, radiusStyle('50%'));
        const bordered = createElementShape(
            { ...rect, width: 142, height: 142 },
            {
                ...radiusStyle('50%'),
                borderLeftWidth: '4px',
                borderRightWidth: '4px',
                borderTopWidth: '4px',
                borderBottomWidth: '4px',
            },
        );

        circle.corners.forEach((corner) =>
            expect(corner).toMatchObject({ x: 75, y: 75, radiusX: 75, radiusY: 75 }),
        );
        oval.corners.forEach((corner) =>
            expect(corner).toMatchObject({ x: 120, y: 40, radiusX: 120, radiusY: 40 }),
        );
        bordered.corners.forEach((corner) =>
            expect(corner).toMatchObject({ x: 71, y: 71, radiusX: 71, radiusY: 71 }),
        );
    });

    it('пропорционально уменьшает пересекающиеся радиусы, сохраняя разные углы', () => {
        const shape = createElementShape(
            { ...rect, width: 100, height: 80 },
            {
                ...radiusStyle('0px'),
                borderTopLeftRadius: '80px',
                borderTopRightRadius: '40px',
                borderBottomRightRadius: '20px',
            },
        );

        expect(shape.corners.map(({ radiusX }) => radiusX)).toEqual([
            (80 * 5) / 6,
            (40 * 5) / 6,
            (20 * 5) / 6,
            0,
        ]);
        const capsule = createElementShape(
            { ...rect, width: 240, height: 80 },
            radiusStyle('9999px'),
        );
        capsule.corners.forEach((corner) => expect(corner.radiusX).toBe(40));
    });

    it('прореживает полосу вдоль круглой границы, не меняя узор в центре', () => {
        const shape = createElementShape(rect, radiusStyle('50%'));
        const [uniform] = createParticleGroups([rect], 16, 0, 'text');
        const [round] = createParticleGroups([rect], 16, 0, 'element', shape);
        const distance = (particle: (typeof round)[number]) =>
            75 - Math.hypot(particle.cloudX - 75, particle.cloudY - 75);
        const ring = (particle: (typeof round)[number]) =>
            distance(particle) >= 0 && distance(particle) < 12;
        const center = (particle: (typeof round)[number]) => distance(particle) >= 12;

        expect(round.filter(ring).length).toBeGreaterThan(0);
        expect(round.filter(ring).length).toBeLessThan(uniform.filter(ring).length);
        expect(round.filter(center)).toEqual(uniform.filter(center));
        round.forEach((particle) =>
            expect(distance(particle)).toBeGreaterThanOrEqual(particle.radius),
        );
        expect(createParticleGroups([rect], 16, 0, 'element', shape)).toEqual([round]);
    });

    it('сохраняет весь круг внутри каждого независимого эллиптического угла', () => {
        const shape = createElementShape(rect, {
            borderTopLeftRadius: '70px 30px',
            borderTopRightRadius: '20px 50px',
            borderBottomRightRadius: '40px 30px',
            borderBottomLeftRadius: '30px 60px',
        } as CSSStyleDeclaration);

        [
            [2, 2],
            [148, 2],
            [148, 148],
            [2, 148],
        ].forEach(([x, y]) => {
            const point = { x, y };
            constrainToShape(shape, point, rect, { cloudX: 75, cloudY: 75, radius: 2 });
            expect(getShapeInset(shape, point.x, point.y)).toBeGreaterThanOrEqual(2 - 1e-12);
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 16) {
                expect(
                    getShapeInset(
                        shape,
                        point.x + Math.cos(angle) * 2,
                        point.y + Math.sin(angle) * 2,
                    ),
                ).toBeGreaterThanOrEqual(-1e-12);
            }
        });
    });
});
