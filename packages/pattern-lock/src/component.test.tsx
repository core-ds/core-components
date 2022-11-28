import React from 'react';
import { render } from '@testing-library/react';
import { PatternLock } from './Component';
import { getSizes } from './utils';

jest.mock('react-canvas-pattern-lock', () => {
    return {
        ReactCanvasPatternLock: jest.fn((props) => null),
    };
});

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
        return {
            matches: query === '(min-width: 390px)',
            media: query,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    }),
});

const mutationObserverMock = jest.fn<any, any>(function MutationObserver(this: MutationObserver) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});
global.MutationObserver = mutationObserverMock;

describe('PatternLock test', () => {
    describe('Snapshot tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<PatternLock />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with error prop', () => {
            const { container } = render(<PatternLock error='Error message' />);

            expect(container).toMatchSnapshot();
        });
    });

    describe('attrubute tests', () => {
        it('should set `data-test-id` attribute', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<PatternLock dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should set `className` class', () => {
            const className = 'test-class';
            const { container } = render(<PatternLock className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should shown error message', () => {
            const errorMessage = 'Error message';
            const { getByText } = render(<PatternLock error={errorMessage} />);

            const errorElement = getByText(errorMessage);

            expect(errorElement).toBeInTheDocument();
        });
    });

    describe('utils test', function () {
        it('should return "l" size', function () {
            expect(getSizes().width).toBe(322);
        });
    });

    it('should be created mutation observer instance', () => {
        render(<PatternLock observeTokens={true} />);

        const [observerInstance] = mutationObserverMock.mock.instances;
        expect(observerInstance.observe).toHaveBeenCalledTimes(1);

        expect(mutationObserverMock.mock.instances).toHaveLength(1);
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<PatternLock />);

        expect(unmount).not.toThrowError();
    });
});
