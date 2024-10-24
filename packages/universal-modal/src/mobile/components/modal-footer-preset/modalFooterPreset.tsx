import React, { FC } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';

import { Footer } from '../../../components/footer/Component';
import { FooterPresetTypesMobile } from '../../constants/footerPresetTypesMobile';
import { TModalFooterPresetMobile } from '../../types/typings';

import styles from './modalFooterPreset.module.css';

type ModalFooterPresetProps = {
    preset: TModalFooterPresetMobile['footerPreset'];
    hasScroll: boolean;
};

export const ModalFooterPresetMobile: FC<ModalFooterPresetProps> = (props) => {
    const { preset, hasScroll } = props;

    if (preset) {
        const { type, labelLeft, labelRight, layout } = preset;

        if (type === FooterPresetTypesMobile.FOOTER_WITH_CONTENT) {
            return (
                <Footer
                    className={cn(styles.container, {
                        [styles.hasScrollContent]: hasScroll,
                        [styles.column]: layout === 'column',
                    })}
                    sticky={true}
                    {...(layout === 'column' && { layout: 'column' })}
                >
                    <Button size={56} view='primary' block={true}>
                        {labelLeft}
                    </Button>
                    <Button size={56} view='secondary' block={true}>
                        {labelRight}
                    </Button>
                </Footer>
            );
        }

        return null;
    }

    return null;
};
