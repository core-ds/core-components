import React, { FC } from 'react';
import cn from 'classnames';

import { Header } from '../../../../components/header/Component';
import { HeaderPresetTypes } from '../../../constants/headerPresetTypes';
import { TModalHeaderPreset } from '../../../types/typings';
import { ArrowButtonDesktop } from '../../buttons/arrow-button';
import { CrossButtonDesktop } from '../../buttons/cross-button';

import styles from './modalHeaderPreset.module.css';

type HeaderPresetProps = {
    preset: TModalHeaderPreset['preset'];
    onClose?: () => void;
};

export const ModalHeaderPreset: FC<HeaderPresetProps> = (props) => {
    const { preset, onClose } = props;

    if (preset) {
        const { type } = preset;

        if (type === HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITHOUT_TITLE) {
            return (
                <Header
                    className={styles.container}
                    sticky={true}
                    leftAddons={<ArrowButtonDesktop onClick={preset.onBack} />}
                    rightAddons={<CrossButtonDesktop onClick={onClose} />}
                />
            );
        }

        if (type === HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITH_TITLE) {
            const { title, bigTitle } = preset;

            return (
                <Header
                    className={cn(styles.container)}
                    sticky={true}
                    leftAddons={<ArrowButtonDesktop onClick={preset.onBack} />}
                    rightAddons={<CrossButtonDesktop onClick={onClose} />}
                    bottomAddons={title}
                    bigTitle={bigTitle}
                />
            );
        }

        if (type === HeaderPresetTypes.HEADER_WITH_TITLE) {
            const { title, bigTitle } = preset;

            return (
                <Header
                    sticky={true}
                    title={title}
                    align='left'
                    rightAddons={<CrossButtonDesktop onClick={onClose} />}
                    bigTitle={bigTitle}
                />
            );
        }

        return null;
    }

    return null;
};
