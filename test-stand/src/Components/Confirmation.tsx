import React from 'react';
import { Confirmation, useConfirmation } from '@alfalab/core-components-confirmation';
import { OptionShape, Select } from '@alfalab/core-components-select';
import { Wrapper } from './Wrapper';

const ConfirmationExample = () => {
    const variants = [
        { key: 'success', content: 'Успешный сценарий' },
        { key: 'error', content: 'Сценарий с ошибкой' },
        { key: 'fatal', content: 'Сценарий с критичной ошибкой' },
        {
            key: 'attempts-left',
            content: 'Сценарий, когда кончились попытки запроса смс',
        },
        {
            key: 'temp-block',
            content: 'Сценарий, когда форма временно заблокирована',
        },
    ];

    const [variant, setVariant] = React.useState<OptionShape>({
        key: 'success',
        content: 'Успешный сценарий',
    });

    const {
        confirmationState,
        confirmationScreen,
        confirmationBlockSmsRetry,
        setConfirmationState,
        setConfirmationScreen,
        setConfirmationBlockSmsRetry,
    } = useConfirmation();

    const handleInputFinished = () => {
        setTimeout(() => {
            switch (variant.key) {
                case 'success':
                    setConfirmationState('INITIAL');
                    break;
                case 'error':
                    setConfirmationState('CODE_ERROR');
                    break;
                case 'fatal':
                    setConfirmationScreen('FATAL_ERROR');
                    break;
                case 'attempts-left':
                    setConfirmationState('CODE_ERROR');
                    break;
                case 'temp-block':
                    setConfirmationScreen('TEMP_BLOCK');
                    break;
                default:
                    break;
            }
        }, 1000);
    };

    const handleSmsRetryClick = () => {
        setTimeout(() => {
            if (variant.key === 'attempts-left') {
                setConfirmationBlockSmsRetry(true);
            }
            setConfirmationState('INITIAL');
        }, 1000);
    };

    const handleTempBlockFinished = () => {
        setConfirmationScreen('INITIAL');
        setConfirmationState('CODE_SENDING');
    };

    return (
        <Wrapper>
            <Select
                options={variants}
                onChange={({ selected }) => {
                    if (selected) {
                        setConfirmationState('INITIAL');
                        setConfirmationScreen('INITIAL');
                        setConfirmationBlockSmsRetry(false);
                        setVariant(selected);
                    }
                }}
                selected={variant.key}
            />
            <div
                key={variant.key}
                style={{
                    display: 'flex',
                    width: '500px',
                    margin: '16px 0 0',
                    padding: '16px',
                    boxShadow: '0 0 0 1px #eeeff1',
                    boxSizing: 'border-box',
                }}
            >
                <Confirmation
                    screen={confirmationScreen}
                    state={confirmationState}
                    alignContent='center'
                    blockSmsRetry={confirmationBlockSmsRetry}
                    countdownDuration={10000}
                    onChangeState={setConfirmationState}
                    onChangeScreen={setConfirmationScreen}
                    onInputFinished={handleInputFinished}
                    onSmsRetryClick={handleSmsRetryClick}
                    onTempBlockFinished={handleTempBlockFinished}
                    phone='+7 ··· ··· 07-24'
                />
            </div>
        </Wrapper>
    );
};

export default ConfirmationExample;
