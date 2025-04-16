import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Button } from '@alfalab/core-components-button';
import { Gallery } from '@alfalab/core-components-gallery';
import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Gallery> = {
    title: 'Components/Gallery',
    component: Gallery,
    id: 'Gallery',
};

type Story = StoryObj<typeof Gallery>;

export const gallery: Story = {
    name: 'Gallery',
    render: () => {
        const [openMultiple, setOpenMultiple] = React.useState(false);
        const [open, setOpen] = React.useState(false);

        const images = [
            {
                src: './images/gallery_1.jpg',
            },
            {
                src: './images/gallery_2.jpg',
            },
            {
                src: './images/gallery_3.jpg',
            },
        ];
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={previewStyles}>
                {images.map((image, index) => (
                    <div
                        key={image.src}
                        style={{
                            width: '190px',
                            height: '190px',
                            backgroundSize: 'cover',
                            backgroundImage: `url(${image.src})`,
                            marginRight: index !== 2 && '8px',
                            borderRadius: '12px',
                        }}
                    />
                ))}
            </div>
        ) : (
            <div style={{ width: '100%', height: 'calc(100vh - 50px)' }}>
                <div style={{ margin: '24px' }}>
                    <Button
                        view='primary'
                        onClick={() => {
                            setOpenMultiple(true);
                        }}
                        id='open-gallery-button'
                    >
                        Открыть галерею
                    </Button>
                </div>
                <div style={{ margin: '24px' }}>
                    <Button
                        view='primary'
                        onClick={() => {
                            setOpen(true);
                        }}
                        id='open-single-gallery-button'
                    >
                        Открыть галерею с одним изображением
                    </Button>
                </div>
                <Gallery
                    open={openMultiple}
                    onClose={() => {
                        setOpenMultiple(false);
                    }}
                    images={[
                        {
                            name: 'Горизонтальное изображение.jpg',
                            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDUwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNDU0Nzc4Ii8+Cjwvc3ZnPgo=',
                        },
                        {
                            name: 'Вертикальное изображение.jpg',
                            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA1MDAgMTAwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSIjNDU0Nzc4Ii8+Cjwvc3ZnPgo=',
                        },
                        {
                            name: 'Маленькое изображение.jpg',
                            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNDU0Nzc4Ii8+Cjwvc3ZnPgo=',
                        },
                        {
                            name: 'Alfa promo.m3u8',
                            src: 'https://alfavideo.servicecdn.ru/videos/101064_31s0hnwZaamhbwE/master.m3u8',
                            bottomButton: {
                                text: 'Кнопка с задержкой 2 секунды',
                                onClick: () => {},
                                timeout: 2,
                            },
                        },
                        {
                            name: 'Битое изображение.jpg',
                            src: 'data:image/svg+xml;base64,',
                        },
                    ]}
                    loop={boolean('loop', true)}
                />
                <Gallery
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                    images={[
                        {
                            name: 'Alfa promo.m3u8',
                            src: 'https://alfavideo.servicecdn.ru/videos/101064_31s0hnwZaamhbwE/master.m3u8',
                            bottomButton: {
                                text: 'Кнопка с задержкой 2 секунды',
                                onClick: () => {},
                                timeout: 2,
                            },
                        },
                    ]}
                    loop={boolean('loop', true)}
                />
            </div>
        );
    },
};

export default meta;
