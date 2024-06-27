import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PopupSheet } from '@alfalab/core-components-popup-sheet';
import { SystemMessageMobile } from '@alfalab/core-components-system-message/mobile';
import { SuperEllipse } from '@alfalab/core-components-icon-view/super-ellipse';
import { Typography } from '@alfalab/core-components-typography';
import { MobilePhoneBubbleLineMIcon } from '@alfalab/icons-glyph/MobilePhoneBubbleLineMIcon';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { boolean, number } from '@storybook/addon-knobs';
import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof PopupSheet> = {
    title: 'Components/PopupSheet',
    component: PopupSheet,
    id: 'PopupSheet',
};

type Story = StoryObj<typeof PopupSheet>;

export const popup_sheet: Story = {
    name: 'PopupSheet',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={previewStyles}>
                <style>{`.preview{max-width:350px;bottom:100px } `}</style>
                <PopupSheet
                    open={true}
                    padding={0}
                    className='preview'
                    backdropProps={{
                        invisible: true,
                    }}
                >
                    <SystemMessageMobile padding={32}>
                        <SystemMessageMobile.Graphic padding={{ bottom: 24 }}>
                            <SuperEllipse size={80}>
                                <MobilePhoneBubbleLineMIcon color='var(--color-light-neutral-translucent-1300)' />
                            </SuperEllipse>
                        </SystemMessageMobile.Graphic>

                        <SystemMessageMobile.Title>
                            Подтвердите подключение кодом из смс
                        </SystemMessageMobile.Title>

                        <SystemMessageMobile.Subtitle>
                            {`Проверили вашу заявку — всё в порядке. Осталось подтвердить подключение`}
                        </SystemMessageMobile.Subtitle>

                        <SystemMessageMobile.Controls>
                            <ButtonMobile size='m' view='secondary'>
                                Получить код
                            </ButtonMobile>
                        </SystemMessageMobile.Controls>
                    </SystemMessageMobile>
                </PopupSheet>
            </div>
        ) : (
            <PopupSheet
                disableFocusLock={true}
                open={boolean('open', false)}
                hasCloser={boolean('hasCloser', false)}
                padding={number('padding', 0)}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 200,
                        color: 'rgba(55, 120, 251, 1)',
                        backgroundColor: 'rgba(55, 120, 251, 0.1)',
                    }}
                >
                    <Typography.Text view='caps' weight='bold'>
                        Custom
                    </Typography.Text>
                </div>
            </PopupSheet>
        );
    },
};

export default meta;
