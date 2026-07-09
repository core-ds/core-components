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

    describe('Success cases', () => {
        it('should return value from data-value attribute', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(true);
            mockNextElement.getAttribute = jest.fn().mockReturnValue('5');

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(5);
        });

        it('should compute value from position when data-value is absent', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = '50%';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(5);
        });

        it('should compute value correctly for 0–100 range', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = '25%';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 100,
            });

            expect(result).toBe(25);
        });

        it('should compute value correctly for custom range', () => {
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

    describe('Edge cases', () => {
        it('should return 0 when data-value is empty string', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(true);
            mockNextElement.getAttribute = jest.fn().mockReturnValue('');

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(0);
        });

        it('should round computed result', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = '33.33%';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(3);
        });

        it('should return null when nextElementSibling is missing', () => {
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

    describe('Error cases', () => {
        it('should return null when style.left is invalid', () => {
            mockNextElement.classList.contains = jest.fn().mockReturnValue(false);
            mockMarkerElement.style.left = 'invalid';

            const result = getMarkerValue({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });

            expect(result).toBe(null);
        });

        it('should return null when style.left is missing', () => {
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

    describe('Success cases', () => {
        it('should set data-passed when isPassed is true', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: true,
                isCurrent: false,
            });

            expect(mockMarkerElement.setAttribute).toHaveBeenCalledWith('data-passed', 'true');
        });

        it('should set data-current when isCurrent is true', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: true,
            });

            expect(mockMarkerElement.setAttribute).toHaveBeenCalledWith('data-current', 'true');
        });

        it('should remove data-passed when isPassed is false', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: false,
            });

            expect(mockMarkerElement.removeAttribute).toHaveBeenCalledWith('data-passed');
        });

        it('should remove data-current when isCurrent is false', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: false,
            });

            expect(mockMarkerElement.removeAttribute).toHaveBeenCalledWith('data-current');
        });
    });

    describe('Edge cases', () => {
        it('should handle isPassed=true and isCurrent=true together', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: true,
                isCurrent: true,
            });

            expect(mockMarkerElement.setAttribute).toHaveBeenCalledWith('data-passed', 'true');
            expect(mockMarkerElement.setAttribute).toHaveBeenCalledWith('data-current', 'true');
        });

        it('should handle isPassed=false and isCurrent=false together', () => {
            updateMarkerAttributes({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: false,
            });

            expect(mockMarkerElement.removeAttribute).toHaveBeenCalledWith('data-passed');
            expect(mockMarkerElement.removeAttribute).toHaveBeenCalledWith('data-current');
        });
    });

    describe('Error cases', () => {
        it('should propagate errors from DOM methods', () => {
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
    describe('Success cases', () => {
        it('should return true when marker is passed for single handle', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 7,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('should return false when marker is not passed for single handle', () => {
            const result = isMarkerPassed({
                markerValue: 7,
                currentValue: 5,
                hasValueTo: false,
            });

            expect(result).toBe(false);
        });

        it('should return true when marker is within range', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 3,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('should return false when marker is outside range', () => {
            const result = isMarkerPassed({
                markerValue: 10,
                currentValue: 3,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(false);
        });
    });

    describe('Edge cases', () => {
        it('should return false when marker equals current value on single slider', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 5,
                hasValueTo: false,
            });

            expect(result).toBe(false);
        });

        it('should handle inverted range', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 7,
                currentValueTo: 3,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('should return true for marker on range boundary', () => {
            const result = isMarkerPassed({
                markerValue: 3,
                currentValue: 3,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('should handle hasValueTo=true without currentValueTo', () => {
            const result = isMarkerPassed({
                markerValue: 5,
                currentValue: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });
    });

    describe('Error cases', () => {
        it('should handle negative values', () => {
            const result = isMarkerPassed({
                markerValue: -5,
                currentValue: -3,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('should handle zero values', () => {
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
    describe('Success cases', () => {
        it('should return true when marker equals current value', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 5,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('should return false when marker does not equal current value', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 7,
                hasValueTo: false,
            });

            expect(result).toBe(false);
        });

        it('should return true when marker equals first range value', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 5,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('should return true when marker equals second range value', () => {
            const result = isMarkerCurrent({
                markerValue: 7,
                currentValue: 5,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('should return false when marker equals neither range value', () => {
            const result = isMarkerCurrent({
                markerValue: 6,
                currentValue: 5,
                currentValueTo: 7,
                hasValueTo: true,
            });

            expect(result).toBe(false);
        });
    });

    describe('Edge cases', () => {
        it('should handle equal range endpoints', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 5,
                currentValueTo: 5,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('should handle hasValueTo=true without currentValueTo', () => {
            const result = isMarkerCurrent({
                markerValue: 5,
                currentValue: 5,
                hasValueTo: true,
            });

            expect(result).toBe(true);
        });

        it('should handle zero values', () => {
            const result = isMarkerCurrent({
                markerValue: 0,
                currentValue: 0,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });
    });

    describe('Error cases', () => {
        it('should handle negative values', () => {
            const result = isMarkerCurrent({
                markerValue: -5,
                currentValue: -5,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('should handle fractional values', () => {
            const result = isMarkerCurrent({
                markerValue: 5.5,
                currentValue: 5.5,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });

        it('should handle very large numbers', () => {
            const result = isMarkerCurrent({
                markerValue: Number.MAX_SAFE_INTEGER,
                currentValue: Number.MAX_SAFE_INTEGER,
                hasValueTo: false,
            });

            expect(result).toBe(true);
        });
    });
});
