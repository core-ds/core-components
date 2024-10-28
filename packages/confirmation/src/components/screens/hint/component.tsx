import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Link } from '@alfalab/core-components-link';
import { Typography } from '@alfalab/core-components-typography';

import { ConfirmationContext } from '../../../context';
import { Header } from '../../header';

import styles from './index.module.css';

export type HintProps = {
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

export const Hint: FC<HintProps> = ({ mobile }) => {
    const { alignContent, texts, onChangeScreen, onChangeState, breakpoint, client } =
        useContext(ConfirmationContext);

    const handleReturnButtonClick = () => {
        onChangeScreen('INITIAL');
        onChangeState('INITIAL');
    };

    return (
        <div className={cn(styles.component, styles[alignContent])}>
            <Header mobile={mobile}>Не&nbsp;приходит сообщение?</Header>

            <Typography.Text
                view='primary-medium'
                color='primary'
                className={cn(styles.text, {
                    [styles.typographyTheme]: !mobile,
                    [styles.typographyThemeMobile]: mobile,
                })}
            >
                Если у&nbsp;вас изменился номер телефона, позвоните нам или обратитесь в&nbsp;любое
                отделение банка.
            </Typography.Text>

            <div
                className={cn(styles.phonesWrap, {
                    [styles.phonesWrapMobile]: mobile,
                })}
            >
                <div className={cn(styles.phoneWrap, { [styles.phoneContentMobile]: mobile })}>
                    <Link
                        href='tel:+78002000000'
                        underline={false}
                        className={cn(styles.phoneLink, { [styles.typographyThemeMobile]: mobile })}
                    >
                        8 800 200 00 00
                    </Link>
                    <Typography.Text
                        view='primary-medium'
                        color='primary'
                        className={cn(styles.text, {
                            [styles.typographyTheme]: !mobile,
                            [styles.typographyThemeMobile]: mobile,
                        })}
                    >
                        {mobile
                            ? 'Для\u00A0звонков по\u00A0России'
                            : ' \u2014\u00A0для звонков по\u00A0России'}
                    </Typography.Text>
                </div>

                <div className={cn(styles.phoneWrap, { [styles.phoneContentMobile]: mobile })}>
                    <Link
                        href='tel:+74957888878'
                        underline={false}
                        className={cn(styles.phoneLink, { [styles.typographyThemeMobile]: mobile })}
                    >
                        +7 495 78 888 78
                    </Link>
                    <Typography.Text
                        view='primary-medium'
                        color='primary'
                        className={cn(styles.text, {
                            [styles.typographyTheme]: !mobile,
                            [styles.typographyThemeMobile]: mobile,
                        })}
                    >
                        {mobile
                            ? 'В\u00A0Москве и\u00A0за\u00A0границей'
                            : ' \u2014\u00A0в\u00A0Москве и\u00A0за\u00A0границей'}
                    </Typography.Text>
                </div>
            </div>

            <Typography.Text
                view='primary-medium'
                color='primary'
                className={cn(styles.text, {
                    [styles.typographyTheme]: !mobile,
                    [styles.typographyThemeMobile]: mobile,
                })}
            >
                Если номер не&nbsp;менялся, возможно, перегружен сервис отправки сообщений.
                Попробуйте повторить действие через несколько минут.
            </Typography.Text>

            <Button
                size={mobile ? 'xs' : 's'}
                view='secondary'
                onClick={handleReturnButtonClick}
                className={styles.hintButton}
                breakpoint={breakpoint}
                client={client}
            >
                {texts.hintButton}
            </Button>
        </div>
    );
};
