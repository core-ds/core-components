import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { PatternLock } from './Component';
import { getPatternLockTestIds, getSizes } from './utils';

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
            const dti = 'pattern-lock-dti';
            const { getByTestId } = render(
                <PatternLock
                    message='message'
                    onForgotBtnClick={jest.fn()}
                    forgotCodeBtnText='кнопка'
                    showForgotCodeBtn={true}
                    dataTestId={dti}
                />,
            );

            const testIds = getPatternLockTestIds(dti);

            expect(getByTestId(testIds.patternLock)).toBeInTheDocument();
            expect(getByTestId(testIds.forgotCodeBtn)).toBeInTheDocument();
            expect(getByTestId(testIds.message)).toBeInTheDocument();

            const { getByTestId: getByTestIdError } = render(
                <PatternLock error='error' dataTestId={dti} />,
            );

            expect(getByTestIdError(testIds.error)).toBeInTheDocument();
        });

        it('should set `className` class', () => {
            const className = 'test-class';
            const { container } = render(<PatternLock className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should shown message', () => {
            const message = 'message';
            const { getByText } = render(<PatternLock message={message} />);

            const messageElement = getByText(message);

            expect(messageElement).toBeInTheDocument();
        });

        it('should shown error message', () => {
            const errorMessage = 'Error message';
            const { getByText } = render(<PatternLock error={errorMessage} />);

            const errorElement = getByText(errorMessage);

            expect(errorElement).toBeInTheDocument();
        });

        it('should call onForgotBtnClick', () => {
            const testId = 'pattern-lock';
            const onForgotBtnClick = jest.fn();
            const { getByTestId } = render(
                <PatternLock
                    showForgotCodeBtn={true}
                    onForgotBtnClick={onForgotBtnClick}
                    dataTestId={testId}
                />,
            );

            const buttonEl = getByTestId(`${testId}-forgot-code-btn`);

            fireEvent.click(buttonEl);

            expect(buttonEl).toBeInTheDocument();
            expect(onForgotBtnClick).toBeCalledTimes(1);
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
