import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';

import { Footer } from '../../../../components/footer/Component';
import { ResponsiveContext } from '../../../../ResponsiveContext';
import { FooterPresetTypes } from '../../../constants/footerPresetTypes';
import { TModalFooterPreset } from '../../../types/typings';

import styles from './modalFooterPreset.module.css';

type ModalFooterPresetProps = {
    preset: TModalFooterPreset['footerPreset'];
};

export const ModalFooterPreset: FC<ModalFooterPresetProps> = (props) => {
    const { preset } = props;
    const { modalWidth = 0 } = useContext(ResponsiveContext) || {};

    if (preset) {
        const { type, labelLeft, labelRight, layout } = preset;

        if (type === FooterPresetTypes.FOOTER_WITH_CONTENT) {
            return (
                <Footer className={cn(styles.container)} sticky={true} layout={layout}>
                    <Button size={modalWidth >= 800 ? 56 : 48} view='primary'>
                        {labelLeft}
                    </Button>
                    <Button size={modalWidth >= 800 ? 56 : 48} view='secondary'>
                        {labelRight}
                    </Button>
                </Footer>
            );
        }

        return null;
    }

    return null;
};
