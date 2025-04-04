import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import { ConfirmationV1 } from '@balafla/core-components-confirmation-v1';
import { SelectDesktop } from '@balafla/core-components-select/desktop';

const meta: Meta<typeof ConfirmationV1> = {
    title: 'Deprecated components/ConfirmationV1',
    component: ConfirmationV1,
    id: 'ConfirmationV1',
};

type Story = StoryObj<typeof ConfirmationV1>;

export const confirmation_v1: Story = {
    name: 'ConfirmationV1',
    render: () => {
        const [variant, setVariant] = React.useState({
            key: 'success',
            content: 'Успешный сценарий',
        });
        const [value, setValue] = React.useState('');
        const [codeChecking, setCodeChecking] = React.useState(false);
        const [codeSending, setCodeSending] = React.useState(false);
        const [error, setError] = React.useState('');
        const [errorIsFatal, setErrorIsFatal] = React.useState(false);
        const [noAttemptsLeftMessage, setNoAttemptsLeftMessage] = React.useState('');
        const [errorOverlimit, setErrorOverlimit] = React.useState(false);
        const [errorOverlimitIsFatal, setErrorOverlimitIsFatal] = React.useState(false);
        const [overlimitTitle, setOverlimitTitle] = React.useState(
            'Превышено количество\n попыток ввода кода',
        );
        const [overlimitText, setOverlimitText] = React.useState(
            'Повторное подтверждение кодом из SMS\n будет возможно через',
        );
        const [overlimitCountdownDuration, setOverlimitCountdownDuration] = React.useState(10000);
        const setCode = (code) => {
            setValue(code);
            setError('');
        };
        const handleSubmit = () => {
            setCodeChecking(true);
            setError('');
            setTimeout(() => {
                setCodeChecking(false);
                switch (variant.key) {
                    case 'success':
                        break;
                    case 'error':
                        setError('Неправильный код');
                        break;
                    case 'fatal':
                        setError('Выполните операцию с самого начала');
                        setErrorIsFatal(true);
                        break;
                    case 'attempts-left':
                        setNoAttemptsLeftMessage('Не осталось попыток запроса кода');
                        break;
                    case 'overlimit-input':
                        setOverlimitTitle('Превышено количество\n попыток ввода кода');
                        setOverlimitText(
                            'Повторное подтверждение кодом из SMS\n будет возможно через 1 минуту',
                        );
                        setOverlimitCountdownDuration(60000);
                        setErrorOverlimit(true);
                        setErrorOverlimitIsFatal(false);
                        break;
                    case 'overlimit-attempts':
                        setOverlimitTitle('Превышено количество\n попыток запроса кода');
                        setOverlimitText(
                            'Повторное подтверждение кода из SMS\n будет возможно через 24 часа ',
                        );
                        setOverlimitCountdownDuration(86400000);
                        setErrorOverlimit(true);
                        setErrorOverlimitIsFatal(true);
                        break;
                }
            }, 300);
        };
        const handleOverlimitCountdownFinished = () => {
            setOverlimitTitle('Введите код из SMS');
            setOverlimitText('Чтобы продолжить нажмите кнопку\n «Запросить новый код»');
            setErrorOverlimitIsFatal(false);
        };
        const handleSmsRetryClick = () => {
            setCodeSending(true);
            setError('');
            setCode('');
            setTimeout(() => {
                setCodeSending(false);
            }, 300);
        };
        const handleOverlimitRetryClick = () => {
            setCodeSending(true);
            setError('');
            setCode('');
            setErrorOverlimit(false);
            setTimeout(() => {
                setCodeSending(false);
            }, 300);
        };
        const alignContent = select('alignContent', ['center', 'left'], 'center');
        const phone = '+7 000 000 00 42';
        const countdownDuration = 10000;
        const requiredCharAmount = number('requiredCharAmount', 5);
        return (
            <div>
                <SelectDesktop
                    options={[
                        { key: 'success', content: 'Успешный сценарий' },
                        { key: 'error', content: 'Сценарий с ошибкой' },
                        { key: 'fatal', content: 'Сценарий с критичной ошибкой' },
                        {
                            key: 'attempts-left',
                            content: 'Сценарий, когда кончились попытки запроса смс',
                        },
                        {
                            key: 'overlimit-input',
                            content:
                                'Сценарий, когда кончились попытки ввода и форма заблокирована',
                        },
                        {
                            key: 'overlimit-attempts',
                            content:
                                'Сценарий, когда кончились попытки запроса смс и форма заблокирована',
                        },
                    ]}
                    onChange={({ selected }) => {
                        setError('');
                        setCode('');
                        setVariant(selected);
                    }}
                    selected={variant.key}
                />
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            maxWidth: '375px',
                            margin: '16px 0 0',
                            padding: '16px',
                            boxShadow: '0 0 0 1px #eeeff1',
                            boxSizing: 'border-box',
                        }}
                    >
                        <ConfirmationV1
                            phone={phone}
                            onInputFinished={handleSubmit}
                            onSmsRetryClick={handleSmsRetryClick}
                            codeSending={codeSending}
                            codeChecking={codeChecking}
                            countdownDuration={countdownDuration}
                            code={value}
                            onInputChange={({ code }) => setCode(code)}
                            alignContent={alignContent}
                            requiredCharAmount={requiredCharAmount}
                            error={Boolean(error)}
                            errorText={error}
                            errorIsFatal={errorIsFatal}
                            noAttemptsLeftMessage={noAttemptsLeftMessage}
                            errorOverlimit={errorOverlimit}
                            errorOverlimitIsFatal={errorOverlimitIsFatal}
                            overlimitTitle={overlimitTitle}
                            overlimitText={overlimitText}
                            overlimitCountdownDuration={overlimitCountdownDuration}
                            onOverlimitSmsRetryClick={handleOverlimitRetryClick}
                            onOverlimitCountdownFinished={handleOverlimitCountdownFinished}
                        />
                    </div>
                </div>
            </div>
        );
    },
};

export default meta;
