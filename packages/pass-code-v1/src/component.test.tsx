import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { PassCodeV1 } from './Component';
import { getPassCodeTestIds } from './utils';

jest.mock('react-transition-group', () => ({
    CSSTransition: jest.fn((props) => (props.unmountOnExit ? null : props.children)),
}));

describe('PassCodeV1', () => {
    describe('Snapshot tests', () => {
        it('should match snapshot with code length', () => {
            const { container } = render(<PassCodeV1 value='' onChange={jest.fn} codeLength={4} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with unknown code length', () => {
            const { container } = render(<PassCodeV1 value='' onChange={jest.fn} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with error prop', () => {
            const { container } = render(
                <PassCodeV1 value='1234' error='Error message' onChange={jest.fn} />,
            );

            expect(container).toMatchSnapshot();
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onChange` prop with new value', () => {
            const currentValue = '123';
            const pressedDigit = '4';

            const cb = jest.fn();

            const { getByText } = render(<PassCodeV1 value={currentValue} onChange={cb} />);

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
                <PassCodeV1 value='12' onChange={cb} message='message' dataTestId={dti} />,
            );

            const testIds = getPassCodeTestIds(dti);

            expect(getByTestId(testIds.passCode)).toBeInTheDocument();
            expect(getByTestId(testIds.inputProgress)).toBeInTheDocument();
            expect(getByTestId(testIds.keypad)).toBeInTheDocument();
            expect(getByTestId(testIds.message)).toBeInTheDocument();
            expect(getAllByTestId(testIds.keypadButton).length).toBe(10);
            expect(getByTestId(testIds.backspaceButton)).toBeInTheDocument();

            const { getByTestId: getByTestIdError } = render(
                <PassCodeV1 value='12' onChange={cb} error='error' dataTestId={dti} />,
            );

            expect(getByTestIdError(testIds.error)).toBeInTheDocument();
        });

        it('should set `className` class', () => {
            const className = 'test-class';
            const { container } = render(
                <PassCodeV1 className={className} value='' onChange={jest.fn} />,
            );

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should shown error message', () => {
            const dataTestId = 'pass-code';
            const errorMessage = 'Error message';
            const { getByText, getByTestId } = render(
                <PassCodeV1
                    error={errorMessage}
                    value='1234'
                    codeLength={4}
                    onChange={jest.fn}
                    dataTestId={dataTestId}
                />,
            );

            const dots = getByTestId(dataTestId + '-input-progress').childNodes;

            dots.forEach((dot) => expect(dot).toHaveClass('error'));
            expect(getByText(errorMessage)).toBeInTheDocument();
        });

        it('should shown message', () => {
            const dataTestId = 'pass-code';
            const message = 'message';
            const { getByText, getByTestId } = render(
                <PassCodeV1
                    message={message}
                    value='1234'
                    codeLength={4}
                    onChange={jest.fn}
                    dataTestId={dataTestId}
                />,
            );

            expect(getByText(message)).toBeInTheDocument();
        });

        it('should render left addons', () => {
            const leftAddonText = 'Left addon text';
            const { container, getByText } = render(
                <PassCodeV1 value='' onChange={jest.fn} leftAddons={leftAddonText} />,
            );

            expect(container.firstElementChild).toContainElement(getByText(leftAddonText));
        });

        it('should not render any dots with maxCodeLength and empty value props', () => {
            const dataTestId = 'pass-code';
            const { getByTestId } = render(
                <PassCodeV1
                    value=''
                    onChange={jest.fn}
                    maxCodeLength={8}
                    dataTestId={dataTestId}
                />,
            );

            expect(getByTestId(dataTestId + '-input-progress').childNodes).toHaveLength(0);
        });

        it('should display four dots with codeLength equal to four', () => {
            const dataTestId = 'pass-code';
            const { getByTestId } = render(
                <PassCodeV1 value='' onChange={jest.fn} codeLength={4} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId + '-input-progress').childNodes).toHaveLength(4);
        });

        it('should filled two dots with codeLength equal to four and value length equal to two', () => {
            const dataTestId = 'pass-code';
            const { getByTestId } = render(
                <PassCodeV1 value='12' onChange={jest.fn} codeLength={4} dataTestId={dataTestId} />,
            );

            const dots = getByTestId(dataTestId + '-input-progress').childNodes;

            expect(dots[0]).toHaveClass('filled');
            expect(dots[1]).toHaveClass('filled');
            expect(dots[2]).not.toHaveClass('filled');
            expect(dots[3]).not.toHaveClass('filled');
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<PassCodeV1 value='' onChange={jest.fn} />);

        expect(unmount).not.toThrowError();
    });
});
