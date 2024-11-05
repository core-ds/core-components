import React, { FC } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';

import { Footer } from '../../../../components/footer/Component';
import { FooterPresetTypes } from '../../../constants/footerPresetTypes';
import { TModalFooterPreset } from '../../../types/typings';

import styles from './modalFooterPreset.module.css';

type ModalFooterPresetProps = {
    preset: TModalFooterPreset['footerPreset'];
};

export const ModalFooterPreset: FC<ModalFooterPresetProps> = (props) => {
    const { preset } = props;

    if (preset) {
        const { type, labelLeft, labelRight, layout, bigButton } = preset;

        if (type === FooterPresetTypes.FOOTER_WITH_CONTENT) {
            return (
                <Footer className={cn(styles.container)} sticky={true} layout={layout}>
                    {labelLeft && (
                        <Button
                            size={bigButton ? 56 : 48}
                            view='primary'
                            onClick={preset.onClickLabelLeft}
                        >
                            {labelLeft}
                        </Button>
                    )}
                    {labelRight && (
                        <Button
                            size={bigButton ? 56 : 48}
                            view='secondary'
                            onClick={preset.onClickLabelRight}
                        >
                            {labelRight}
                        </Button>
                    )}
                </Footer>
            );
        }

        return null;
    }

    return null;
};
