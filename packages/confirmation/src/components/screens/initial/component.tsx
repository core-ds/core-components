import React, {
    FC,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { CodeInput, CodeInputProps, CustomInputRef } from '@alfalab/core-components-code-input';
import { Link } from '@alfalab/core-components-link';
import { Typography } from '@alfalab/core-components-typography';
import { usePrevious } from '@alfalab/hooks';

import { ConfirmationContext } from '../../../context';
import { Header } from '../../header';

import { CountdownSection } from './countdown-section';

import styles from './index.module.css';

export type InitialProps = {
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

const CODE_SEND_HINT_VISIBLE_DURATION = 2000;

export const Initial: FC<InitialProps> = ({ mobile }) => {
    const {
        state,
        alignContent,
        texts,
        requiredCharAmount,
        timeLeft,
        phone,
        clearCodeOnError,
        hideCountdownSection,
        onChangeState,
        onInputFinished,
        onChangeScreen,
        onSmsRetryClick,
    } = useContext(ConfirmationContext);

    const prevState = usePrevious(state);

    const inputRef = useRef<CustomInputRef>(null);

    const [codeSendHintVisible, setCodeSendHintVisible] = useState(false);

    const timerId = useRef(0);

    const handleInputComplete: CodeInputProps['onComplete'] = (code) => {
        onInputFinished(code);
    };

    const handleSmsHintLinkClick = () => {
        onChangeScreen('HINT');
    };

    const handleInputChange = () => {
        if (state === 'CODE_ERROR') {
            onChangeState('INITIAL');
        }
    };

    const handleSmsRetryClick = () => {
        if (inputRef.current) {
            inputRef.current.reset();
        }

        onSmsRetryClick();
    };

    const handleErrorAnimationEnd = () => {
        if (clearCodeOnError && state !== 'INITIAL') {
            onChangeState('INITIAL');
        }
    };

    const clearTimer = useCallback(() => {
        window.clearTimeout(timerId.current);
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        return () => {
            clearTimer();
        };
    }, [clearTimer]);

    useEffect(() => {
        if (!inputRef.current) {
            return;
        }

        if (state === 'CODE_ERROR' && prevState !== 'CODE_ERROR') {
            inputRef.current.focus(requiredCharAmount - 1);
        }

        if (prevState === 'CODE_SENDING' && state !== 'CODE_SENDING') {
            inputRef.current.focus();
        }
    }, [prevState, state, requiredCharAmount]);

    useLayoutEffect(() => {
        if (prevState === 'CODE_SENDING' && state !== 'CODE_SENDING') {
            setCodeSendHintVisible(true);

            clearTimer();

            timerId.current = window.setTimeout(() => {
                setCodeSendHintVisible(false);
            }, CODE_SEND_HINT_VISIBLE_DURATION);
        }
    }, [prevState, state, clearTimer]);

    const getCodeInputError = (): string | boolean => {
        if (state === 'CODE_ERROR') {
            return texts.codeError || true;
        }

        return false;
    };

    const processing = ['CODE_CHECKING', 'CODE_SENDING'].includes(state);

    const timePassed = timeLeft === 0;

    return (
        <div className={cn(styles.component, styles[alignContent])}>
            <Header mobile={mobile}>{texts.title}</Header>

            <Typography.Text
                view='primary-medium'
                color='primary'
                className={cn(styles.phone, { [styles.typographyTheme]: !mobile })}
            >
                Код отправлен на {phone}
            </Typography.Text>
            <CodeInput
                disabled={processing}
                error={getCodeInputError()}
                ref={inputRef}
                fields={requiredCharAmount}
                className={cn(styles.containerInput, styles.codeInput)}
                onComplete={handleInputComplete}
                onChange={handleInputChange}
                clearCodeOnError={clearCodeOnError}
                onErrorAnimationEnd={handleErrorAnimationEnd}
            />
            {!hideCountdownSection && (
                <CountdownSection
                    processing={processing}
                    timePassed={timePassed}
                    codeSendHintVisible={codeSendHintVisible}
                    handleSmsRetryClick={handleSmsRetryClick}
                    mobile={mobile}
                />
            )}

            {mobile ? (
                <ButtonMobile onClick={handleSmsHintLinkClick} view='link' size='xs'>
                    {texts.linkToHint}
                </ButtonMobile>
            ) : (
                <Link
                    onClick={handleSmsHintLinkClick}
                    className={styles.smsComeLink}
                    view={mobile ? 'primary' : 'secondary'}
                    pseudo={true}
                >
                    {texts.linkToHint}
                </Link>
            )}
        </div>
    );
};
