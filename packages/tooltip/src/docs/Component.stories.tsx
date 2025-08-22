import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';

import { TooltipDesktop } from '@alfalab/core-components-tooltip/desktop';
import { Tooltip } from '@alfalab/core-components-tooltip';

import {
    getQueryParam,
    stylesStringToObj,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip,
    id: 'Tooltip',
};

type Story = StoryObj<typeof Tooltip>;

const POSITION_OPTIONS = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
] as const;

export const tooltip_desktop: Story = {
    name: 'Tooltip',
    render: () => {
        const openSelectValue = select('open', ['true', 'false', 'undefined'], 'undefined');
        const open =
            openSelectValue === 'false' ? false : openSelectValue === 'true' ? true : undefined;
        const trigger = select('trigger', ['hover', 'click'], 'hover');
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return (
            <div
                style={
                    isPreview
                        ? previewStyles
                        : {
                              width: '100%',
                              height: '300px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                          }
                }
            >
                <style>{`.popover > div{transform:scale(2)}  `}</style>
                <TooltipDesktop
                    content={
                        <div
                            style={
                                isPreview
                                    ? {
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                      }
                                    : { width: '215px' }
                            }
                        >
                            {isPreview
                                ? 'Подсказка'
                                : 'Теперь вам можно снимать наличные в кассе и банкоматах, если ваш тариф это позволяет'}
                        </div>
                    }
                    popoverClassName={isPreview ? 'popover' : undefined}
                    open={open}
                    trigger={trigger}
                    offset={[number('offset[0]', 0), number('offset[1]', 16)]}
                    position={select('position', POSITION_OPTIONS, 'left')}
                    onCloseDelay={number('onCloseDelay (in ms)', 300)}
                    onOpenDelay={number('onOpenDelay (in ms)', 300)}
                    view={select('view', ['tooltip', 'hint'], 'tooltip')}
                    colors={select('colors', ['default', 'inverted'], 'default')}
                    withTransition={select('withTransition', [true, false], true)}
                    dataTestId='test-id'
                >
                    {isPreview ? (
                        <div />
                    ) : (
                        <div style={{ padding: '15px', border: '1px dashed rgba(0, 0, 0, 0.1)' }}>
                            {trigger === 'hover' ? 'Hover me' : 'Click me'}
                        </div>
                    )}
                </TooltipDesktop>
            </div>
        );
    },
};

export const tooltip_responsive: Story = {
    name: 'TooltipResponsive',
    render: () => {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        return (
            <div
                style={{
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Tooltip
                    open={open}
                    content={<div>Tooltip Responsive</div>}
                    trigger={select('trigger', ['hover', 'click'], 'hover')}
                    offset={[number('offset[0]', 0), number('offset[1]', 16)]}
                    position={select('position', POSITION_OPTIONS, 'left')}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    fallbackPlacements={['bottom', 'top']}
                    actionButtonTitle={text('title', 'Хорошо')}
                    view={select('view', ['tooltip', 'hint'], 'tooltip')}
                    hasCloser={select('hasCloser', [true, false], false)}
                >
                    <div style={{ padding: '15px', border: '1px dashed rgba(0, 0, 0, 0.1)' }}>
                        Подробнее
                    </div>
                </Tooltip>
            </div>
        );
    },
};

export default meta;
