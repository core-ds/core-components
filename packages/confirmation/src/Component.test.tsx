import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ConfirmationDesktop, DesktopConfirmationProps } from './desktop';

/**
 * TODO: сделать тесты на все callbacks
 * TODO: сделать тесты на все таймеры
 */
describe('Confirmation', () => {
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

    const baseProps: DesktopConfirmationProps = {
        screen: 'INITIAL',
        state: 'INITIAL',
        errorVisibleDuration: 300,
        onChangeScreen: jest.fn(),
        onChangeState: jest.fn(),
        onInputFinished: jest.fn(),
        onSmsRetryClick: jest.fn(),
    };

    describe('Snapshot tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<ConfirmationDesktop {...baseProps} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with CODE_CHECKING state', () => {
            const { container } = render(
                <ConfirmationDesktop {...baseProps} state='CODE_CHECKING' />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with CODE_SENDING state', () => {
            const { container } = render(
                <ConfirmationDesktop {...baseProps} state='CODE_SENDING' />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with CODE_ERROR state', () => {
            const { container } = render(<ConfirmationDesktop {...baseProps} state='CODE_ERROR' />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with CODE_EXPIRED state', () => {
            const { container } = render(
                <ConfirmationDesktop {...baseProps} state='CODE_EXPIRED' />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with FATAL_ERROR screen', () => {
            const { container } = render(
                <ConfirmationDesktop {...baseProps} screen='FATAL_ERROR' />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with TEMP_BLOCK screen', () => {
            const { container } = render(
                <ConfirmationDesktop {...baseProps} screen='TEMP_BLOCK' />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with TEMP_BLOCK_OVER screen', () => {
            const { container } = render(
                <ConfirmationDesktop {...baseProps} screen='TEMP_BLOCK_OVER' />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with HINT screen', () => {
            const { container } = render(<ConfirmationDesktop {...baseProps} screen='HINT' />);

            expect(container).toMatchSnapshot();
        });
    });

    describe('Props tests', () => {
        it('should render passed texts on INITIAL screen', async () => {
            const texts = {
                title: 'Title',
                linkToHint: 'Link',
                codeError: 'Code error',
                codeErrorExpired: 'Code error expired',
                codeErrorExpiredEnded: 'Code error expired ended',
                codeChecking: 'Code checking',
                codeSending: 'Code sending',
                hintButton: 'Hint button',
            };

            const props = { ...baseProps, texts };

            const { getByText, rerender } = render(<ConfirmationDesktop {...props} />);

            expect(getByText(texts.title)).toBeInTheDocument();
            expect(getByText(texts.linkToHint)).toBeInTheDocument();

            rerender(<ConfirmationDesktop {...props} state='CODE_CHECKING' />);

            expect(getByText(texts.codeChecking)).toBeInTheDocument();

            rerender(<ConfirmationDesktop {...props} state='CODE_SENDING' />);

            expect(getByText(texts.codeSending)).toBeInTheDocument();

            rerender(<ConfirmationDesktop {...props} state='CODE_ERROR' />);

            expect(getByText(texts.codeError)).toBeInTheDocument();

            rerender(<ConfirmationDesktop {...props} state='CODE_EXPIRED' />);

            expect(getByText(texts.codeErrorExpired)).toBeInTheDocument();

            rerender(<ConfirmationDesktop {...props} state='CODE_EXPIRED_ENDED' />);

            expect(getByText(texts.codeErrorExpiredEnded)).toBeInTheDocument();
        });

        it('should render passed texts on HINT screen', () => {
            const texts = {
                hintButton: 'Hint button',
            };

            const props = { ...baseProps, texts };

            const { getByText } = render(<ConfirmationDesktop {...props} screen='HINT' />);

            expect(getByText(texts.hintButton)).toBeInTheDocument();
        });

        it('should render passed texts on FATAL_ERROR screen', () => {
            const texts = {
                fatalErrorTitle: 'Fatal error title',
                fatalErrorDescription: 'Fatal error description',
                fatalErrorButton: 'Fatal error button',
            };

            const props = { ...baseProps, texts };

            const { getByText } = render(<ConfirmationDesktop {...props} screen='FATAL_ERROR' />);

            expect(getByText(texts.fatalErrorTitle)).toBeInTheDocument();
            expect(getByText(texts.fatalErrorDescription)).toBeInTheDocument();
            expect(getByText(texts.fatalErrorButton)).toBeInTheDocument();
        });

        it('should render passed texts on TEMP_BLOCK screen', () => {
            const texts = {
                tempBlockTitle: 'Temp block title',
                tempBlockDescription: 'Temp block description',
            };

            const props = { ...baseProps, texts };

            const { getByText } = render(<ConfirmationDesktop {...props} screen='TEMP_BLOCK' />);

            expect(getByText(texts.tempBlockTitle)).toBeInTheDocument();
            expect(getByText(texts.tempBlockDescription)).toBeInTheDocument();
        });

        it('should render passed texts on TEMP_BLOCK_OVER screen', () => {
            const texts = {
                tempBlockOverTitle: 'Temp block over title',
                tempBlockOverDescription: 'Temp block over description',
            };

            const props = { ...baseProps, texts };

            const { getByText } = render(
                <ConfirmationDesktop {...props} screen='TEMP_BLOCK_OVER' />,
            );

            expect(getByText(texts.tempBlockOverTitle)).toBeInTheDocument();
            expect(getByText(texts.tempBlockOverDescription)).toBeInTheDocument();
        });

        it('should set `data-test-id` attribute', () => {
            const testId = 'test-id';
            const { getByTestId } = render(
                <ConfirmationDesktop {...baseProps} dataTestId={testId} />,
            );

            expect(getByTestId(testId)).toBeInTheDocument();
        });

        it('should set custom class', () => {
            const className = 'custom-class';
            const { container } = render(
                <ConfirmationDesktop {...baseProps} className={className} />,
            );

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should render passed inputs amount', () => {
            const requiredCharAmount = 2;

            const { container } = render(
                <ConfirmationDesktop {...baseProps} requiredCharAmount={requiredCharAmount} />,
            );

            const inputs = container.querySelectorAll('input');

            expect(inputs.length).toBe(requiredCharAmount);
        });

        it('should render passed phone', () => {
            const phone = '+7 (999) 999 99 99';

            const { getByText } = render(<ConfirmationDesktop {...baseProps} phone={phone} />);

            expect(getByText(`Отправили на ${phone}`)).toBeInTheDocument();
        });
    });

    it('Should render custom screens', () => {
        const initialScreenTitle = 'Initial screen title';
        const hintScreenTitle = 'Hint screen title';
        const fatalErrorScreenTitle = 'Fatal error screen title';
        const tempBlockScreenTitle = 'Temp block screen title';
        const tempBlockOverScreenTitle = 'Temp block over screen title';

        const props = {
            ...baseProps,
            getScreensMap: (screensMap: any) => ({
                ...screensMap,
                INITIAL: () => <span>{initialScreenTitle}</span>,
                HINT: () => <span>{hintScreenTitle}</span>,
                FATAL_ERROR: () => <span>{fatalErrorScreenTitle}</span>,
                TEMP_BLOCK: () => <span>{tempBlockScreenTitle}</span>,
                TEMP_BLOCK_OVER: () => <span>{tempBlockOverScreenTitle}</span>,
            }),
        };

        const { getByText, rerender } = render(<ConfirmationDesktop {...props} />);

        expect(getByText(initialScreenTitle)).toBeInTheDocument();

        rerender(<ConfirmationDesktop {...props} screen='HINT' />);

        expect(getByText(hintScreenTitle)).toBeInTheDocument();

        rerender(<ConfirmationDesktop {...props} screen='FATAL_ERROR' />);

        expect(getByText(fatalErrorScreenTitle)).toBeInTheDocument();

        rerender(<ConfirmationDesktop {...props} screen='TEMP_BLOCK' />);

        expect(getByText(tempBlockScreenTitle)).toBeInTheDocument();

        rerender(<ConfirmationDesktop {...props} screen='TEMP_BLOCK_OVER' />);

        expect(getByText(tempBlockOverScreenTitle)).toBeInTheDocument();
    });

    describe('Input tests', () => {
        const getActiveElement = () => document.activeElement as Element;

        it('should focus input on first render', () => {
            const { container } = render(<ConfirmationDesktop {...baseProps} />);

            expect(getActiveElement()).toBe(container.querySelector('input'));
        });

        it('should call onInputFinished when input is finished', () => {
            const onInputFinished = jest.fn();

            const { container } = render(
                <ConfirmationDesktop
                    {...baseProps}
                    onInputFinished={onInputFinished}
                    requiredCharAmount={2}
                />,
            );

            const inputs = container.querySelectorAll('input');

            fireEvent.change(inputs[0], { target: { value: '1' } });
            fireEvent.change(inputs[1], { target: { value: '2' } });

            expect(onInputFinished).toBeCalledTimes(1);
        });

        it('should call onFatalErrorOkButtonClick when click on button', () => {
            const onFatalErrorOkButtonClick = jest.fn();

            const { container } = render(
                <ConfirmationDesktop
                    {...baseProps}
                    onFatalErrorOkButtonClick={onFatalErrorOkButtonClick}
                    screen='FATAL_ERROR'
                />,
            );

            const button = container.querySelector('button') as HTMLButtonElement;

            fireEvent.click(button);

            expect(onFatalErrorOkButtonClick).toBeCalledTimes(1);
        });

        it('should call onChangeState when error occurred', async () => {
            const onChangeState = jest.fn();

            const { container } = render(
                <ConfirmationDesktop
                    {...baseProps}
                    state='CODE_ERROR'
                    clearCodeOnError={true}
                    onChangeState={onChangeState}
                />,
            );

            const codeInput = container.querySelector('div[class*="codeInput"]') as HTMLDivElement;

            fireEvent.animationEnd(codeInput);

            await waitFor(() => {
                expect(onChangeState).toBeCalledTimes(1);
                expect(onChangeState).toBeCalledWith('INITIAL');
            });
        });
    });

    describe('Classes tests', () => {
        it('should add "center" class', () => {
            const { container } = render(
                <ConfirmationDesktop {...baseProps} alignContent={'center'} />,
            );

            expect(container.firstElementChild).toHaveClass('center');
        });
    });
});
