import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Link } from '@alfalab/core-components-link';
import { TypographyText } from '@alfalab/core-components-typography';

import { ConfirmationContext } from '../../../context';
import { getPhoneHref } from '../../../utils';
import { Header } from '../../header';

import styles from './index.module.css';

export type HintProps = {
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

export const Hint: FC<HintProps> = ({ mobile }) => {
    const { alignContent, titleTag, texts, onChangeScreen, onChangeState, breakpoint, client } =
        useContext(ConfirmationContext);

    const { domesticPhone = '', internationalPhone = '', hintButton } = texts;

    const handleReturnButtonClick = () => {
        onChangeScreen('INITIAL');
        onChangeState('INITIAL');
    };

    return (
        <div className={cn(styles.component, styles[alignContent])}>
            <Header mobile={mobile} titleTag={titleTag}>
                {texts.hintTitle}
            </Header>

            <TypographyText
                view='primary-medium'
                color='primary'
                className={cn(styles.text, {
                    [styles.typographyTheme]: !mobile,
                    [styles.typographyThemeMobile]: mobile,
                })}
            >
                {texts.hintDescription}
            </TypographyText>

            <div
                className={cn(styles.phonesWrap, {
                    [styles.phonesWrapMobile]: mobile,
                })}
            >
                <div className={cn(styles.phoneWrap, { [styles.phoneContentMobile]: mobile })}>
                    <Link
                        href={getPhoneHref(internationalPhone)}
                        underline={false}
                        className={cn(styles.phoneLink, { [styles.typographyThemeMobile]: mobile })}
                    >
                        {internationalPhone}
                    </Link>
                    <TypographyText
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
                    </TypographyText>
                </div>

                <div className={cn(styles.phoneWrap, { [styles.phoneContentMobile]: mobile })}>
                    <Link
                        href={getPhoneHref(domesticPhone)}
                        underline={false}
                        className={cn(styles.phoneLink, { [styles.typographyThemeMobile]: mobile })}
                    >
                        {domesticPhone}
                    </Link>
                    <TypographyText
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
                    </TypographyText>
                </div>
            </div>

            <TypographyText
                view='primary-medium'
                color='primary'
                className={cn(styles.text, {
                    [styles.typographyTheme]: !mobile,
                    [styles.typographyThemeMobile]: mobile,
                })}
            >
                {texts.hintNotification}
            </TypographyText>
            <Button
                size={mobile ? 40 : 48}
                view='secondary'
                onClick={handleReturnButtonClick}
                className={styles.hintButton}
                breakpoint={breakpoint}
                client={client}
            >
                {hintButton}
            </Button>
        </div>
    );
};
