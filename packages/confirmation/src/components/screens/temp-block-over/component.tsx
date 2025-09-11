import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Text } from '@alfalab/core-components-typography';

import { ConfirmationContext } from '../../../context';
import { Header } from '../../header';

import styles from './index.module.css';

export type TempBlockOverProps = {
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

export const TempBlockOver: FC<TempBlockOverProps> = ({ mobile }) => {
    const { alignContent, texts, breakpoint, client, onChangeScreen, onChangeState } =
        useContext(ConfirmationContext);

    const handleReturnButtonClick = () => {
        onChangeScreen('INITIAL');
        onChangeState('INITIAL');
    };

    return (
        <div className={cn(styles.component, styles[alignContent])}>
            <Header mobile={mobile}>{texts.tempBlockOverTitle}</Header>

            <Text
                view='primary-medium'
                color='primary'
                className={cn(styles.description, {
                    [styles.typographyTheme]: !mobile,
                    [styles.typographyThemeMobile]: mobile,
                })}
            >
                {texts.tempBlockOverDescription}
            </Text>

            <Button
                size={mobile ? 'xs' : 's'}
                view='secondary'
                onClick={handleReturnButtonClick}
                className={styles.button}
                breakpoint={breakpoint}
                client={client}
            >
                {texts.tempBlockOverButton}
            </Button>
        </div>
    );
};
