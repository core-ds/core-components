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
    const { alignContent, texts, onChangeScreen, onChangeState } = useContext(ConfirmationContext);

    const handleReturnButtonClick = () => {
        onChangeScreen('INITIAL');
        onChangeState('INITIAL');
    };

    return (
        <div className={cn(styles.component, styles[alignContent])}>
            <div className={styles.hintWrap}>
                <Header mobile={mobile}>Не&nbsp;приходит сообщение?</Header>

                <Typography.Text view='primary-medium' color='primary' className={styles.text}>
                    Если у&nbsp;вас изменился номер телефона, позвоните нам или обратитесь
                    в&nbsp;любое отделение банка.
                </Typography.Text>

                <div className={styles.phonesWrap}>
                    <div className={cn(styles.phoneWrap, { [styles.phoneContentMobile]: mobile })}>
                        <Link
                            href='tel:+78002000000'
                            underline={false}
                            className={styles.phoneLink}
                        >
                            8 800 200-00-00
                        </Link>
                        <Typography.Text
                            view='primary-medium'
                            color='primary'
                            className={styles.text}
                        >
                            {mobile ? (
                                <>Для&nbsp; звонков по&nbsp;России</>
                            ) : (
                                <>&mdash;&nbsp;для звонков по&nbsp;России</>
                            )}
                        </Typography.Text>
                    </div>

                    <div className={cn(styles.phoneWrap, { [styles.phoneContentMobile]: mobile })}>
                        <Link
                            href='tel:+74957888878'
                            underline={false}
                            className={styles.phoneLink}
                        >
                            +7 495 78-888-78
                        </Link>
                        <Typography.Text
                            view='primary-medium'
                            color='primary'
                            className={styles.text}
                        >
                            {mobile ? (
                                <>В&nbsp;Москве и&nbsp;за&nbsp;границей</>
                            ) : (
                                <>&mdash;&nbsp;в&nbsp;Москве и&nbsp;за&nbsp;границей</>
                            )}
                        </Typography.Text>
                    </div>
                </div>

                <Typography.Text view='primary-medium' color='primary' className={styles.text}>
                    Если номер не&nbsp;менялся, возможно, перегружен сервис отправки сообщений.
                    Попробуйте повторить действие через несколько минут.
                </Typography.Text>

                <Button
                    size={mobile ? 'xs' : 's'}
                    view='secondary'
                    onClick={handleReturnButtonClick}
                    className={styles.hintButton}
                >
                    {texts.hintButton}
                </Button>
            </div>
        </div>
    );
};
