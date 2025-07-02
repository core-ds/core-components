import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Button } from '@alfalab/core-components-button';
import { BottomSheet } from '@alfalab/core-components-bottom-sheet';
import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof BottomSheet> = {
    title: 'Components/BottomSheet',
    component: BottomSheet,
    id: 'BottomSheet',
};

type Story = StoryObj<typeof BottomSheet>;

const BACKGROUND = ['primary', 'secondary', undefined];
const COLORS = ['default', 'inverted'];

const shortText =
    'Пользуйтесь сразу: реквизиты виртуальной и пластиковой карты будут доступны уже через 60 секунд после после оформления.';

const longText = Array(10).fill(shortText).join('\n\n');

export const bottom_sheet: Story = {
    name: 'BottomSheet',
    render: () => {
        const [open, setOpen] = React.useState(false);
        const [textContent, setTextContent] = React.useState('Пример текстового контента.');
        const handleClose = React.useCallback(() => setOpen(false), []);

        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        const colors = select('colors', COLORS, 'default');

        const openSheet = (content: string) => () => {
            setTextContent(content);
            setOpen(true);
        };

        const bgColor =
            colors === 'inverted' ? 'var(--color-light-base-bg-primary-inverted)' : 'transparent';

        return (
            <div
                style={{
                    ...previewStyles,
                    backgroundColor: bgColor,
                    padding: '8px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <style>
                    {`.preview{transform:${previewStyles.transform};top: ${previewStyles.top};max-width:${previewStyles.maxWidth}  `}
                </style>
                {!isPreview && (
                    <>
                        <Button
                            id='button-1'
                            onClick={openSheet(shortText)}
                            style={{ margin: '15px' }}
                            colors={colors}
                        >
                            Открыть шторку
                        </Button>
                        <Button
                            id='button-2'
                            onClick={openSheet(longText)}
                            style={{ margin: '15px' }}
                            colors={colors}
                        >
                            Открыть шторку с длинным контентом
                        </Button>
                    </>
                )}

                <BottomSheet
                    key={textContent}
                    open={open || boolean('open', false)}
                    title={text('title', 'Тайтл')}
                    modalClassName={isPreview ? 'preview' : undefined}
                    actionButton={
                        boolean('renderActionButton', true) && (
                            <Button
                                view={isPreview ? 'primary' : 'secondary'}
                                colors={colors}
                                block={true}
                                size='s'
                                onClick={handleClose}
                            >
                                {isPreview ? 'Кнопка' : 'Понятно'}
                            </Button>
                        )
                    }
                    onClose={handleClose}
                    swipeable={boolean('swipeable', true)}
                    colors={colors}
                    titleAlign={select('titleAlign', ['center', 'left'], 'center')}
                    trimTitle={boolean('trimTitle', false)}
                    stickyHeader={boolean('stickyHeader', false)}
                    hasCloser={boolean('hasCloser', false)}
                    hasBacker={boolean('hasBacker', false)}
                    leftAddons={select('leftAddons', [true, false], false)}
                    rightAddons={select('rightAddons', [true, false], false)}
                    stickyFooter={boolean('stickyFooter', true)}
                    initialHeight={select('initialHeight', ['default', 'full'], 'default')}
                    hideOverlay={boolean('hideOverlay', false)}
                    hideHeader={boolean('hideHeader', false)}
                    disableOverlayClick={boolean('disableOverlayClick', false)}
                    backgroundColor={select('backgroundColor', BACKGROUND, undefined)}
                >
                    <div style={{ whiteSpace: 'pre-wrap' }}>{textContent}</div>
                </BottomSheet>
            </div>
        );
    },
};

export default meta;
