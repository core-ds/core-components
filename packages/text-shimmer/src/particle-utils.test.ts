import 'jest-canvas-mock';

import { CANVAS_PADDING, createParticles } from './particle-utils';

/** Верхние границы, заданные формулами в `createParticles`. */
const MAX_PARTICLE_RADIUS = 1.9 * 1.25;
const MAX_PARTICLE_OPACITY = 0.5;

const createTextElement = (text: string, fontSize?: string) => {
    const textElement = document.createElement('span');

    textElement.textContent = text;

    if (fontSize) {
        textElement.style.fontSize = fontSize;
    }

    return textElement;
};

describe('createParticles', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('distributes the particle cloud across the complete text container', () => {
        const textElement = document.createElement('span');

        textElement.textContent = 'Будущий текст';
        textElement.style.font = '600 48px/56px Arial';

        const width = 240;
        const height = 56;
        const particles = createParticles(
            textElement,
            window.getComputedStyle(textElement),
            width,
            height,
            120,
        );
        const cloudX = particles.map((particle) => particle.cloudX);
        const cloudY = particles.map((particle) => particle.cloudY);

        particles.forEach((particle) => {
            expect(particle.radius).toBeGreaterThan(0);
            expect(particle.radius).toBeLessThanOrEqual(MAX_PARTICLE_RADIUS);
            expect(particle.opacity).toBeLessThanOrEqual(MAX_PARTICLE_OPACITY);
            expect(particle.opacitySpeed).toBeGreaterThanOrEqual(0.75);
            expect(particle.opacitySpeed).toBeLessThanOrEqual(1.35);
            expect(particle.cloudY - particle.wobbleY * 2).toBeGreaterThanOrEqual(
                CANVAS_PADDING + 2,
            );
            expect(particle.cloudY + particle.wobbleY * 2).toBeLessThanOrEqual(
                CANVAS_PADDING + height - 2,
            );
        });
        expect(Math.min(...cloudX)).toBeLessThan(CANVAS_PADDING + width * 0.1);
        expect(Math.max(...cloudX)).toBeGreaterThan(CANVAS_PADDING + width * 0.9);
        expect(Math.min(...cloudY)).toBeLessThan(CANVAS_PADDING + height * 0.1);
        expect(Math.max(...cloudY)).toBeGreaterThan(CANVAS_PADDING + height * 0.9);
        expect(Math.min(...cloudY)).toBeGreaterThan(CANVAS_PADDING + 2);
        expect(Math.max(...cloudY)).toBeLessThan(CANVAS_PADDING + height - 2);
    });

    it('thins out and shrinks the cloud for small text', () => {
        const width = 200;
        const height = 20;
        const getCloud = (fontSize: string) => {
            const textElement = createTextElement('125 600 ₽', fontSize);

            return createParticles(
                textElement,
                window.getComputedStyle(textElement),
                width,
                height,
            );
        };

        const smallCloud = getCloud('12px');
        const largeCloud = getCloud('32px');
        const getMaxRadius = (particles: ReturnType<typeof getCloud>) =>
            Math.max(...particles.map((particle) => particle.radius));

        expect(smallCloud.length).toBeLessThan(largeCloud.length);
        expect(getMaxRadius(smallCloud)).toBeLessThan(getMaxRadius(largeCloud));
        expect(getMaxRadius(largeCloud)).toBeLessThanOrEqual(MAX_PARTICLE_RADIUS);
    });

    it('keeps particles translucent so they never render as solid color', () => {
        const textElement = createTextElement('Будущий текст', '16px');
        const particles = createParticles(
            textElement,
            window.getComputedStyle(textElement),
            240,
            20,
        );

        particles.forEach((particle) => {
            expect(particle.opacity).toBeLessThanOrEqual(MAX_PARTICLE_OPACITY);
        });
    });

    it('uses a denser automatic particle cloud', () => {
        const textElement = document.createElement('span');

        textElement.textContent = 'Будущий текст';

        const particles = createParticles(
            textElement,
            window.getComputedStyle(textElement),
            240,
            56,
        );

        expect(particles.length).toBeGreaterThan(120);
    });

    it('matches transformed text and font metrics without shifting for specific glyphs', () => {
        const textElement = document.createElement('span');
        const fillText = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');

        jest.spyOn(CanvasRenderingContext2D.prototype, 'measureText').mockReturnValue({
            width: 80,
            actualBoundingBoxAscent: 10,
            actualBoundingBoxDescent: 5,
            fontBoundingBoxAscent: 14,
            fontBoundingBoxDescent: 6,
        } as TextMetrics);
        textElement.textContent = 'баланс';
        textElement.style.textTransform = 'uppercase';

        createParticles(textElement, window.getComputedStyle(textElement), 240, 56, 40);

        expect(fillText).toHaveBeenCalledWith('БАЛАНС', 120, 32);
    });
});
