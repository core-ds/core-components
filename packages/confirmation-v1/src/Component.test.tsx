import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationV1 } from './index';

describe('Confirmation', () => {
    const baseProps = {
        code: '12345',
        onInputChange: jest.fn(),
        onInputFinished: jest.fn(),
        onSmsRetryClick: jest.fn(),
    };

    describe('Snapshot tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<ConfirmationV1 {...baseProps} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with fatal error', () => {
            const { container } = render(
                <ConfirmationV1
                    {...baseProps}
                    errorIsFatal={true}
                    errorText='Выполните операцию с самого начала'
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with nonFatal error', () => {
            const { container } = render(
                <ConfirmationV1 {...baseProps} errorIsFatal={false} errorText='Неверный код' />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with masked phone', () => {
            const { container } = render(
                <ConfirmationV1 {...baseProps} phone='+7 999 888 55 66' hasPhoneMask={true} />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with unmasked phone', () => {
            const { container } = render(
                <ConfirmationV1 {...baseProps} phone='+7 999 888 55 66' hasPhoneMask={false} />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with signTitle as string', () => {
            const { container } = render(
                <ConfirmationV1 {...baseProps} signTitle='Кастомный заголовок как текст' />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with signTitle as react node', () => {
            const { container } = render(
                <ConfirmationV1
                    {...baseProps}
                    signTitle={
                        <div>
                            <h1>Кастомный заголовок как react node</h1>
                        </div>
                    }
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot without smsCountdown', () => {
            const { container } = render(<ConfirmationV1 {...baseProps} hasSmsCountdown={false} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with overlimit fatal error', () => {
            const { container } = render(
                <ConfirmationV1
                    {...baseProps}
                    errorOverlimit={true}
                    errorOverlimitIsFatal={true}
                />,
            );

            expect(container).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const testId = 'test-id';
        const { getByTestId } = render(<ConfirmationV1 {...baseProps} dataTestId={testId} />);

        expect(getByTestId(testId)).toBeInTheDocument();
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<ConfirmationV1 {...baseProps} className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set custom signTitle', () => {
        const customSignTitle = 'Enter the code';
        const { getByText } = render(<ConfirmationV1 {...baseProps} signTitle={customSignTitle} />);

        expect(getByText(customSignTitle)).toBeInTheDocument();
    });

    it('should display additionalContent', () => {
        const additionalContent = <div id='additionalContent' />;

        const { container } = render(
            <ConfirmationV1 {...baseProps} additionalContent={additionalContent} />,
        );

        expect(container.querySelector('#additionalContent')).not.toBeNull();
    });

    it('should call onCountdownFinished when countdown is finished', async () => {
        const onCountdownFinished = jest.fn();

        render(
            <ConfirmationV1
                {...baseProps}
                onCountdownFinished={onCountdownFinished}
                countdownDuration={600}
            />,
        );

        expect(onCountdownFinished).not.toHaveBeenCalled();
        await waitFor(() => expect(onCountdownFinished).toHaveBeenCalledTimes(1));
    });

    describe('Fatal error tests', () => {
        const errorText = 'Выполните операцию с самого начала';
        const defaultButtonErrorText = ConfirmationV1.defaultProps?.buttonErrorText;
        const customButtonErrorText = 'custom text';
        const customErrorTitle = 'custom error title';

        it('should set custom errorTitle for fatalError', () => {
            const { getByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    errorIsFatal={true}
                    errorText={errorText}
                    errorTitle={customErrorTitle}
                />,
            );

            expect(getByText(customErrorTitle)).toBeInTheDocument();
        });

        it('should set custom buttonErrorText for fatalError', () => {
            const { getByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    errorIsFatal={true}
                    errorText={errorText}
                    buttonErrorText={customButtonErrorText}
                />,
            );

            expect(getByText(customButtonErrorText)).toBeInTheDocument();
        });

        it('should call onActionWithFatalError when click on buttonError', () => {
            const onActionWithFatalError = jest.fn();
            const onSmsRetryClick = jest.fn();

            const { getByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    errorIsFatal={true}
                    errorText={errorText}
                    onSmsRetryClick={onSmsRetryClick}
                    onActionWithFatalError={onActionWithFatalError}
                />,
            );

            const buttonError = getByText(defaultButtonErrorText as string);
            buttonError.click();

            expect(onSmsRetryClick).not.toHaveBeenCalled();
            expect(onActionWithFatalError).toHaveBeenCalled();
        });

        it('should call onSmsRetryClick when click on buttonError if onActionWithFatalError is not passed', () => {
            const onSmsRetryClick = jest.fn();

            const { getByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    errorIsFatal={true}
                    errorText={errorText}
                    onSmsRetryClick={onSmsRetryClick}
                />,
            );

            const buttonError = getByText(defaultButtonErrorText as string);
            buttonError.click();

            expect(onSmsRetryClick).toHaveBeenCalled();
        });
    });

    describe('Sms retry tests', () => {
        const buttonReturnInHintText = ConfirmationV1.defaultProps?.buttonReturnText as string;
        const buttonRetryText = ConfirmationV1.defaultProps?.buttonRetryText as string;
        const hintLinkText = 'Не приходит код?';

        it('should display retry button', async () => {
            const { findByText } = render(<ConfirmationV1 {...baseProps} countdownDuration={0} />);
            const buttonRetry = await findByText(buttonRetryText);

            expect(buttonRetry).toBeInTheDocument();
        });

        it('should set custom buttonRetryText', async () => {
            const customButtonRetryText = 'Запросить код повторно';

            const { findByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    countdownDuration={0}
                    buttonRetryText={customButtonRetryText}
                />,
            );

            const buttonRetry = await findByText(customButtonRetryText);

            expect(buttonRetry).toBeInTheDocument();
        });

        it('should set custom buttonReturnText in hint', async () => {
            const customButtonReturnTextInHint = 'Send code again';

            const { findByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    countdownDuration={0}
                    buttonReturnText={customButtonReturnTextInHint}
                />,
            );

            const buttonRetry = await findByText(buttonRetryText);
            buttonRetry.click();

            const smsHintButton = await findByText(hintLinkText);
            smsHintButton.click();

            const buttonWithCustomText = await findByText(customButtonReturnTextInHint);

            expect(buttonWithCustomText).toBeInTheDocument();
        });

        it('should call onSmsRetryClick when click retry button', async () => {
            const onSmsRetryClick = jest.fn();

            const { findByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    countdownDuration={0}
                    onSmsRetryClick={onSmsRetryClick}
                />,
            );

            const buttonRetry = await findByText(buttonRetryText);
            buttonRetry.click();

            expect(onSmsRetryClick).toHaveBeenCalled();
        });

        it('should call onSmsRetryClick when click retry button in hint', async () => {
            const onSmsRetryClick = jest.fn();

            const { findByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    countdownDuration={0}
                    onSmsRetryClick={onSmsRetryClick}
                />,
            );

            const buttonRetry = await findByText(buttonRetryText);
            buttonRetry.click();

            const smsHintButton = await findByText(hintLinkText);
            smsHintButton.click();

            const buttonRetryInHint = await findByText(buttonReturnInHintText);
            buttonRetryInHint.click();

            expect(onSmsRetryClick).toHaveBeenCalled();
        });

        it('should call onSmsHintLinkClick when click hintLink', async () => {
            const onSmsHintLinkClick = jest.fn();

            const { findByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    countdownDuration={0}
                    onSmsHintLinkClick={onSmsHintLinkClick}
                />,
            );

            const buttonRetry = await findByText(buttonRetryText);
            buttonRetry.click();

            const smsHintButton = await findByText(hintLinkText);
            smsHintButton.click();

            expect(onSmsHintLinkClick).toHaveBeenCalled();
        });
    });

    describe('Code cheсking tests', () => {
        const defaultCodeCheckingText = ConfirmationV1.defaultProps?.codeCheckingText;
        const customCodeCheckingText = 'Идет проверка кода';

        it('should display default codeCheсkingText if codeChecking is true', () => {
            const { getByText } = render(<ConfirmationV1 {...baseProps} codeChecking={true} />);

            expect(getByText(defaultCodeCheckingText as string)).toBeInTheDocument();
        });

        it('should display custom passed codeCheсkingText if codeChecking is true', () => {
            const { getByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    codeChecking={true}
                    codeCheckingText={customCodeCheckingText}
                />,
            );

            expect(getByText(customCodeCheckingText)).toBeInTheDocument();
        });
    });

    describe('Code sending tests', () => {
        const defaultCodeSendingText = ConfirmationV1.defaultProps?.codeSendingText;
        const customCodeSendingText = 'Идет отправка кода';

        it('should display default codeSendingText if codeSending is true', () => {
            const { getByText } = render(<ConfirmationV1 {...baseProps} codeSending={true} />);

            expect(getByText(defaultCodeSendingText as string)).toBeInTheDocument();
        });

        it('should display custom passed codeSendingText if codeSending is true', () => {
            const { getByText } = render(
                <ConfirmationV1
                    {...baseProps}
                    codeSending={true}
                    codeSendingText={customCodeSendingText}
                />,
            );

            expect(getByText(customCodeSendingText)).toBeInTheDocument();
        });
    });

    describe('Input tests', () => {
        const getActiveElement = () => document.activeElement as Element;

        it('should focus input on first render', () => {
            const { container } = render(<ConfirmationV1 {...baseProps} code='' />);

            expect(getActiveElement()).toBe(container.querySelector('input'));
        });

        it('should call onInputChange when input is changed', async () => {
            const onInputChange = jest.fn();

            render(<ConfirmationV1 {...baseProps} onInputChange={onInputChange} code='' />);

            await userEvent.type(getActiveElement(), '1');

            expect(onInputChange).toHaveBeenCalledWith({ code: '1' });
        });

        it('should call onInputFinished when input is finished', async () => {
            let code = '';
            const onInputFinished = jest.fn();
            const onInputChange = (value: { code: string }) => {
                code = value.code;
            };

            const getComponent = () => (
                <ConfirmationV1
                    {...baseProps}
                    onInputFinished={onInputFinished}
                    onInputChange={onInputChange}
                    requiredCharAmount={2}
                    code={code}
                />
            );

            const { rerender } = render(getComponent());
            await userEvent.type(getActiveElement(), '1');

            rerender(getComponent());
            await userEvent.type(getActiveElement(), '2');

            expect(onInputFinished).toHaveBeenCalledTimes(1);
        });

        it('should not allow type code longer than requiredCharAmount', async () => {
            let code = '';
            const onInputChange = jest.fn((value: { code: string }) => {
                code = value.code;
            });

            const getComponent = () => (
                <ConfirmationV1
                    {...baseProps}
                    onInputChange={onInputChange}
                    requiredCharAmount={2}
                    code={code}
                />
            );

            const { rerender } = render(getComponent());
            await userEvent.type(getActiveElement(), '1');

            rerender(getComponent());
            await userEvent.type(getActiveElement(), '2');

            rerender(getComponent());
            await userEvent.type(getActiveElement(), '3');

            expect(onInputChange).toHaveBeenNthCalledWith(1, { code: '1' });
            expect(onInputChange).toHaveBeenNthCalledWith(2, { code: '12' });
            expect(onInputChange).toHaveBeenCalledTimes(2);
        });
    });

    describe('Overlimit tests', () => {
        it('should display custom passed overlimitTitle and overlimitText', () => {
            const customOverlimitTitle = 'Some test title';
            const customOverlimitText = 'Some overlimit text';
            render(
                <ConfirmationV1
                    {...baseProps}
                    overlimitTitle={customOverlimitTitle}
                    overlimitText={customOverlimitText}
                    errorOverlimit={true}
                />,
            );

            expect(screen.getByText(customOverlimitTitle)).toBeInTheDocument();
            expect(screen.getByText(customOverlimitText)).toBeInTheDocument();
        });

        it('should display button on overlimit countdown finished', async () => {
            const buttonRetryText = 'test retry button';
            const twoMinutesMs = 120 * 1000;
            const realDate = Date.now();
            render(
                <ConfirmationV1
                    {...baseProps}
                    overlimitCountdownDuration={30000}
                    errorOverlimit={true}
                    buttonRetryText={buttonRetryText}
                />,
            );

            expect(screen.queryByText(buttonRetryText)).toEqual(null);

            const spyDateNow = jest
                .spyOn(global.Date, 'now')
                .mockImplementation(() => realDate + twoMinutesMs);

            await screen.findByText(buttonRetryText);
            expect(screen.getByText(buttonRetryText)).toBeInTheDocument();

            spyDateNow.mockClear();
        });

        it('should call onOverlimitCountdownFinished and onOverlimitSmsRetryClick', async () => {
            const buttonRetryText = 'test retry button';
            const twoMinutesMs = 120 * 1000;
            const realDate = Date.now();
            const onOverlimitCountdownFinished = jest.fn();
            const onOverlimitSmsRetryClick = jest.fn();
            render(
                <ConfirmationV1
                    {...baseProps}
                    errorOverlimit={true}
                    buttonRetryText={buttonRetryText}
                    onOverlimitCountdownFinished={onOverlimitCountdownFinished}
                    onOverlimitSmsRetryClick={onOverlimitSmsRetryClick}
                />,
            );

            expect(screen.queryByText(buttonRetryText)).toEqual(null);
            expect(onOverlimitCountdownFinished).toHaveBeenCalledTimes(0);

            const spyDateNow = jest
                .spyOn(global.Date, 'now')
                .mockImplementation(() => realDate + twoMinutesMs);

            await screen.findByText(buttonRetryText);
            expect(screen.getByText(buttonRetryText)).toBeInTheDocument();
            expect(onOverlimitCountdownFinished).toHaveBeenCalledTimes(1);

            expect(onOverlimitSmsRetryClick).toHaveBeenCalledTimes(0);
            await userEvent.click(screen.getByText(buttonRetryText));
            expect(onOverlimitSmsRetryClick).toHaveBeenCalledTimes(1);

            spyDateNow.mockClear();
        });
    });
});
