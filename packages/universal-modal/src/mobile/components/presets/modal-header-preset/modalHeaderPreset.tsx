import React, { FC, useContext } from 'react';

import { Header } from '../../../../components/header/Component';
import { ResponsiveContext } from '../../../../ResponsiveContext';
import { HeaderPresetTypesMobile } from '../../../constants/headerPresetTypesMobile';
import { TModalHeaderPresetMobile } from '../../../types/typings';
import { ArrowButtonMobile } from '../../buttons/arrow-button';
import { CrossButtonMobile } from '../../buttons/cross-button';

import styles from './modalHeaderPreset.module.css';

type HeaderPresetProps = {
    preset: TModalHeaderPresetMobile['preset'];
    onClose?: () => void;
};

export const ModalHeaderPresetMobile: FC<HeaderPresetProps> = (props) => {
    const { preset, onClose } = props;
    const { modalHeaderHighlighted } = useContext(ResponsiveContext) || {};

    if (preset) {
        const { type } = preset;

        if (type === HeaderPresetTypesMobile.HEADER_WITH_NAVIGATION_WITHOUT_TITLE) {
            return (
                <Header
                    sticky={true}
                    leftAddons={<ArrowButtonMobile onClick={preset.onBack} />}
                    rightAddons={<CrossButtonMobile onClick={onClose} />}
                    backgroundColor='transparent'
                />
            );
        }

        if (type === HeaderPresetTypesMobile.HEADER_WITH_BACK_ARROW_WITH_CENTER_TITLE) {
            const { title } = preset;

            return (
                <Header
                    sticky={true}
                    leftAddons={<ArrowButtonMobile onClick={preset.onBack} />}
                    {...(!modalHeaderHighlighted && { bottomAddons: title })}
                    {...(modalHeaderHighlighted && { title })}
                    align='center'
                    bottomAddonsClassName={styles.withBackArrowWithCenterTitle}
                />
            );
        }

        if (type === HeaderPresetTypesMobile.HEADER_WITH_TITLE_WITH_SUBTITLE) {
            const { title, subtitle } = preset;

            return (
                <Header
                    sticky={true}
                    title={title}
                    {...(subtitle && { subtitle })}
                    rightAddons={<CrossButtonMobile onClick={onClose} />}
                    align='left'
                    contentWrapperClassName={styles.withTitleWithSubtitleContentWrapper}
                />
            );
        }

        if (type === HeaderPresetTypesMobile.HEADER_WITH_CENTRAL_TITLE) {
            const { title } = preset;

            return (
                <Header
                    sticky={true}
                    title={title}
                    rightAddons={<CrossButtonMobile onClick={onClose} />}
                />
            );
        }

        if (type === HeaderPresetTypesMobile.HEADER_WITH_CENTRAL_TITLE_WITH_SUBTITLE) {
            const { title, subtitle } = preset;

            return (
                <Header
                    sticky={true}
                    title={title}
                    subtitle={subtitle}
                    rightAddons={<CrossButtonMobile onClick={onClose} />}
                />
            );
        }

        return null;
    }

    return null;
};
