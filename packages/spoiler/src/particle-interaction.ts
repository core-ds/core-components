import { POINTER } from './constants';
import { type Particle } from './particle-model';

export type Point = { x: number; y: number };

/** Ослабляет смещение у границы, чтобы точки не выходили наружу и не собирались в ровный край. */
export const displaceWithinBounds = (
    position: number,
    offset: number,
    min: number,
    max: number,
) => {
    const room = offset > 0 ? max - position : position - min;

    return offset && room > 0 ? position + (offset * room) / (room + Math.abs(offset)) : position;
};

/** Смещает только ближайшие точки; после ухода мыши плавно возвращает к исходной траектории. */
export const updatePointerOffset = (
    particle: Particle,
    pointer: Point | undefined,
    x: number,
    y: number,
    response: number,
) => {
    let targetX = 0;
    let targetY = 0;

    if (pointer) {
        const deltaX = x - pointer.x;
        const deltaY = y - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance < POINTER.radius) {
            const force = POINTER.displacement * (1 - distance / POINTER.radius) ** 2;

            targetX = (distance ? deltaX / distance : Math.cos(particle.phase)) * force;
            targetY = (distance ? deltaY / distance : Math.sin(particle.phase)) * force;
        }
    }

    const nextX = particle.pointerX + (targetX - particle.pointerX) * response;
    const nextY = particle.pointerY + (targetY - particle.pointerY) * response;
    const settled =
        Math.abs(targetX - nextX) < POINTER.precision &&
        Math.abs(targetY - nextY) < POINTER.precision;

    // Обновляем существующую частицу без выделения нового объекта на каждом кадре.
    // eslint-disable-next-line no-param-reassign
    particle.pointerX = settled && response > 0 ? targetX : nextX;
    // Та же in-place запись для второй координаты, без дополнительного объекта смещения.
    // eslint-disable-next-line no-param-reassign
    particle.pointerY = settled && response > 0 ? targetY : nextY;

    return !settled;
};
