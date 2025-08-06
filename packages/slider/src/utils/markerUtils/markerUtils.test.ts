import {
    getMarkerValue,
    updateMarkerAttributes,
    isMarkerPassed,
    isMarkerCurrent,
} from './markerUtils';

describe('Unit/utility/function/getMarkerValue', () => {
    let mockMarkerElement: HTMLElement;
    let mockNextElement: HTMLElement;

    beforeEach(() => {
        mockNextElement = {
            classList: {
                contains: jest.fn(),
            },
            getAttribute: jest.fn(),
        } as any;

        mockMarkerElement = {
            nextElementSibling: mockNextElement,
            style: {
                left: '50%',
            },
        } as any;
    });

    describe('SUCCESS', () => {
        it('Должна возвращать значение из data-value атрибута', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(true);
            mockNextElement.getAttribute = jest.fn().mockReturnValue('5');

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(5);
        });

        it('Должна вычислять значение по позиции при отсутствии data-value', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = '50%';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(5);
        });

        it('Должна правильно вычислять значение для диапазона 0-100', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = '25%';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 100,
            });

            expect(result).toBe(25);
        });

        it('Должна правильно вычислять значение для кастомного диапазона', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = '50%';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 10,
                max: 20,
            });

            expect(result).toBe(15);
        });
    });

    describe('EDGE', () => {
        it('Должна возвращать 0 при data-value=""', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(true);
            mockNextElement.getAttribute = jest.fn().mockReturnValue('');

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(0);
        });

        it('Должна округлять результат вычислений', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = '33.33%';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(3);
        });

        it('Должна возвращать null при отсутствии nextElementSibling', () => {
            const elementWithoutSibling = {
                nextElementSibling: null,
                style: {
                    left: '50%',
                },
            } as any;

            const result = getMarkerValue({
                markerElement: elementWithoutSibling,
                min: 0,
                max: 10,
            });

            expect(result).toBe(null);
        });
    });

    describe('ERROR', () => {
        it('Должна возвращать null при некорректном style.left', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = 'invalid';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(null);
        });

        it('Должна возвращать null при отсутствии style.left', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = '';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(null);
        });
    });
});

describe('Unit/utility/function/updateMarkerAttributes', () => {
    let mockMarkerElement: HTMLElement;

    beforeEach(() => {
        mockMarkerElement = {
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
        } as any;
    });

    describe('SUCCESS', () => {
        it('Должна устанавливать data-passed при isPassed=true', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: true,
                isCurrent: false,
            });

            expect(mockMarkerElement.setAttribute).toHaveBeenCalledWith('data-passed', 'true');
        });

        it('Должна устанавливать data-current при isCurrent=true', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: true,
            });

            expect(mockMarkerElement.setAttribute).toHaveBeenCalledWith('data-current', 'true');
        });

        it('Должна удалять data-passed при isPassed=false', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: false,
            });

            expect(mockMarkerElement.removeAttribute).toHaveBeenCalledWith('data-passed');
        });

        it('Должна удалять data-current при isCurrent=false', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: false,
            });

            expect(mockMarkerElement.removeAttribute).toHaveBeenCalledWith('data-current');
        });
    });

    describe('EDGE', () => {
        it('Должна корректно обрабатывать одновременно isPassed=true и isCurrent=true', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: true,
                isCurrent: true,
            });

            expect(mockMarkerElement.setAttribute).toHaveBeenCalledWith('data-passed', 'true');
            expect(mockMarkerElement.setAttribute).toHaveBeenCalledWith('data-current', 'true');
        });

        it('Должна корректно обрабатывать одновременно isPassed=false и isCurrent=false', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: false,
            });

            expect(mockMarkerElement.removeAttribute).toHaveBeenCalledWith('data-passed');
            expect(mockMarkerElement.removeAttribute).toHaveBeenCalledWith('data-current');
        });
    });

    describe('ERROR', () => {
        it('Должна корректно обрабатывать ошибки DOM методов', () => {
            mockMarkerElement.setAttribute = jest.fn().mockImplementation(() => {
                throw new Error('DOM error');
            });

            expect(() => {
                updateMarkerAttributes({
                    markerElement: mockMarkerElement,
                    isPassed: true,
                    isCurrent: false,
                });
            }).toThrow('DOM error');
        });
    });
});

describe('Unit/utility/function/isMarkerPassed', () => {
    describe('SUCCESS', () => {
        it('Должна возвращать true когда маркер пройден для одиночного значения', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 7,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('Должна возвращать false когда маркер не пройден для одиночного значения', () => {
            const result = isMarkerPassed({
                markerValue: 7,
                currentValue: 5,
                hasValueTo: false,
            });

            expect(result).toBe(false);
        });

        it('Должна возвращать true когда маркер в диапазоне', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 3,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('Должна возвращать false когда маркер вне диапазона', () => {
            const result = isMarkerPassed({
                markerValue: 10,
                currentValue: 3,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(false);
        });
    });

    describe('EDGE', () => {
        it('Должна возвращать false для равных значений одиночного слайдера', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 5,
                hasValueTo: false,
            });

            expect(result).toBe(false);
        });

        it('Должна корректно обрабатывать перевернутый диапазон', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 7,
                currentValueTo: 3,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('Должна возвращать true для маркера на границе диапазона', () => {
            const result = isMarkerPassed({
                markerValue: 3,
                currentValue: 3,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('Должна обрабатывать hasValueTo=true без currentValueTo', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });
    });

    describe('ERROR', () => {
        it('Должна обрабатывать отрицательные значения', () => {
            const result = isMarkerPassed({
                markerValue: -5,
                currentValue: -3,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('Должна обрабатывать нулевые значения', () => {
            const result = isMarkerPassed({
                markerValue: 0,
                currentValue: 0,
                hasValueTo: false,
            });

            expect(result).toBe(false);
        });
    });
});

describe('Unit/utility/function/isMarkerCurrent', () => {
    describe('SUCCESS', () => {
        it('Должна возвращать true когда маркер равен текущему значению', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 5,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('Должна возвращать false когда маркер не равен текущему значению', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 7,
                hasValueTo: false,
            });

            expect(result).toBe(false);
        });

        it('Должна возвращать true когда маркер равен первому значению диапазона', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 5,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('Должна возвращать true когда маркер равен второму значению диапазона', () => {
            const result = isMarkerCurrent({
                markerValue: 7,
                currentValue: 5,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('Должна возвращать false когда маркер не равен ни одному значению диапазона', () => {
            const result = isMarkerCurrent({
                markerValue: 6,
                currentValue: 5,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(false);
        });
    });

    describe('EDGE', () => {
        it('Должна обрабатывать одинаковые значения диапазона', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 5,
                currentValueTo: 5,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('Должна обрабатывать hasValueTo=true без currentValueTo', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 5,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('Должна обрабатывать нулевые значения', () => {
            const result = isMarkerCurrent({
                markerValue: 0,
                currentValue: 0,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });
    });

    describe('ERROR', () => {
        it('Должна обрабатывать отрицательные значения', () => {
            const result = isMarkerCurrent({
                markerValue: -5,
                currentValue: -5,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('Должна обрабатывать дробные значения', () => {
            const result = isMarkerCurrent({
                markerValue: 5.5,
                currentValue: 5.5,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('Должна обрабатывать очень большие числа', () => {
            const result = isMarkerCurrent({
                markerValue: Number.MAX_SAFE_INTEGER,
                currentValue: Number.MAX_SAFE_INTEGER,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });
    });
});
