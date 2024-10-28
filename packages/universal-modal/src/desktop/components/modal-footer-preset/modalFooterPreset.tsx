import React, { FC } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';

import { Footer } from '../../../components/footer/Component';
import { FooterPresetTypes } from '../../../constants/footerPresetTypes';
import { TModalFooterPreset } from '../../types/typings';

import styles from './modalFooterPreset.module.css';

type ModalFooterPresetProps = {
    preset: TModalFooterPreset['footerPreset'];
    scrollPosition: number;
    width: number;
};

export const ModalFooterPreset: FC<ModalFooterPresetProps> = (props) => {
    const { preset, scrollPosition, width } = props;

    if (preset) {
        const { type, labelLeft, labelRight, layout } = preset;

        if (type === FooterPresetTypes.FooterWithContent) {
            return (
                <Footer
                    className={cn(styles.container, {
                        [styles.hasScrollContent]: scrollPosition > 5,
                    })}
                    sticky={true}
                    layout={layout}
                >
                    <Button size={width >= 800 ? 56 : 48} view='primary'>
                        {labelLeft}
                    </Button>
                    <Button size={width >= 800 ? 56 : 48} view='secondary'>
                        {labelRight}
                    </Button>
                </Footer>
            );
        }

        return null;
    }

    return null;
};
