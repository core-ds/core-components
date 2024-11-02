import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { Header } from '../../../../components/header/Component';
import { ResponsiveContext } from '../../../../ResponsiveContext';
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
    const { modalHeaderHighlighted } = useContext(ResponsiveContext) || {};

    if (preset) {
        const { type } = preset;

        if (type === HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITHOUT_TITLE) {
            return (
                <Header
                    className={styles.container}
                    sticky={true}
                    leftAddons={<ArrowButtonDesktop onClick={preset.onBack} />}
                    rightAddons={<CrossButtonDesktop onClick={onClose} />}
                    backgroundColor='transparent'
                />
            );
        }

        if (type === HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITH_TITLE) {
            const { title, bigTitle, lineClamp } = preset;

            return (
                <Header
                    className={cn(styles.container)}
                    sticky={true}
                    leftAddons={<ArrowButtonDesktop onClick={preset.onBack} />}
                    rightAddons={<CrossButtonDesktop onClick={onClose} />}
                    bottomAddons={title}
                    lineClamp={lineClamp}
                    bottomAddonsClassName={cn(styles.title, {
                        [styles.medium]: bigTitle,
                    })}
                />
            );
        }

        if (type === HeaderPresetTypes.HEADER_WITH_TITLE) {
            const { title, bigTitle, lineClamp } = preset;

            return (
                <Header
                    className={cn(styles.container, {
                        [styles.hasScrollContent]: modalHeaderHighlighted,
                    })}
                    sticky={true}
                    title={title}
                    align='left'
                    rightAddons={<CrossButtonDesktop onClick={onClose} />}
                    lineClamp={lineClamp}
                    contentWrapperClassName={cn(styles.title, {
                        [styles.medium]: bigTitle,
                    })}
                />
            );
        }

        return null;
    }

    return null;
};
