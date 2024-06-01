import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { PassCode } from './Component';
import { getPassCodeTestIds } from './utils';

jest.mock('react-transition-group', () => ({
    CSSTransition: jest.fn((props) => (props.unmountOnExit ? null : props.children)),
}));

describe('PassCode', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    describe('Snapshot tests', () => {
        it('should match snapshot with code length', () => {
            const { container } = render(<PassCode value='' onChange={jest.fn} codeLength={4} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with unknown code length', () => {
            const { container } = render(<PassCode value='' onChange={jest.fn} />);

            expect(container).toMatchSnapshot();
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onChange` prop with new value', () => {
            const currentValue = '123';
            const pressedDigit = '4';

            const cb = jest.fn();

            const { getByText } = render(<PassCode value={currentValue} onChange={cb} />);

            const button = getByText(pressedDigit).parentNode as HTMLButtonElement;

            fireEvent.click(button);

            expect(cb).toBeCalledWith(currentValue + pressedDigit);
        });
    });

    describe('attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const dti = 'pass-code-dti';
            const cb = jest.fn();
            const { getByTestId, getAllByTestId } = render(
                <PassCode value='12' onChange={cb} dataTestId={dti} />,
            );

            const testIds = getPassCodeTestIds(dti);

            expect(getByTestId(testIds.passCode)).toBeInTheDocument();
            expect(getByTestId(testIds.inputProgress)).toBeInTheDocument();
            expect(getByTestId(testIds.keypad)).toBeInTheDocument();
            expect(getAllByTestId(testIds.keypadButton).length).toBe(10);
            expect(getByTestId(testIds.backspaceButton)).toBeInTheDocument();
        });

        it('should set `className` class', () => {
            const className = 'test-class';
            const { container } = render(
                <PassCode className={className} value='' onChange={jest.fn} />,
            );

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should shown error message', () => {
            const dataTestId = 'pass-code';
            const errorMessage = 'Error message';
            const { getByTestId } = render(
                <PassCode
                    error
                    errorMessage={errorMessage}
                    value='1234'
                    codeLength={4}
                    onChange={jest.fn}
                    dataTestId={dataTestId}
                />,
            );

            const dots = getByTestId(dataTestId + '-input-progress').childNodes;

            dots.forEach((dot) => expect(dot.childNodes[0]).toHaveClass('error'));
        });

        it('should render left addons', () => {
            const leftAddonText = 'Left addon text';
            const { container, getByText } = render(
                <PassCode value='' onChange={jest.fn} leftAddons={leftAddonText} />,
            );

            expect(container.firstElementChild).toContainElement(getByText(leftAddonText));
        });

        it('should not render any dots with maxCodeLength and empty value props', () => {
            const dataTestId = 'pass-code';
            const { getByTestId } = render(
                <PassCode value='' onChange={jest.fn} maxCodeLength={8} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId + '-input-progress').childNodes).toHaveLength(0);
        });

        it('should display four dots with codeLength equal to four', () => {
            const dataTestId = 'pass-code';
            const { getByTestId } = render(
                <PassCode value='' onChange={jest.fn} codeLength={4} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId + '-input-progress').childNodes).toHaveLength(4);
        });

        it('should filled two dots with codeLength equal to four and value length equal to two', () => {
            const dataTestId = 'pass-code';
            const { getByTestId } = render(
                <PassCode value='12' onChange={jest.fn} codeLength={4} dataTestId={dataTestId} />,
            );

            const dots = getByTestId(dataTestId + '-input-progress').childNodes;

            expect(dots[0].childNodes[0]).toHaveClass('filled');
            expect(dots[1].childNodes[0]).toHaveClass('filled');
            expect(dots[2].childNodes[0]).not.toHaveClass('filled');
            expect(dots[3].childNodes[0]).not.toHaveClass('filled');
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<PassCode value='' onChange={jest.fn} />);

        expect(unmount).not.toThrowError();
    });
});
