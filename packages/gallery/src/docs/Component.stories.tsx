import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Button } from '@alfalab/core-components-button';
import { Gallery } from '@alfalab/core-components-gallery';
import {
    stylesStringToObj,
    getQueryParam,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Gallery> = {
    title: 'Components/Gallery',
    component: Gallery,
    id: 'Gallery',
};

type Story = StoryObj<typeof Gallery>;

const paginationMedia = [
    {
        messageId: '3fb5b748-a74b-4a2f-bc64-ae12df98d300',
        url: 'https://alfachannels.servicecdn.ru/ChannelsSB1/Alfa-Vygodno/CarOil.jpg',
        previewUrl: null,
        createdAt: '2026-01-22T11:47:30.189083270+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=3fb5b748-a74b-4a2f-bc64-ae12df98d300',
    },
    {
        messageId: '3fb5b748-a74b-4a2f-bc64-ae12df98d300',
        url: 'https://alfachannels.servicecdn.ru/AlfaChannels_Test/BLOCKS_TEST/pepe4ada7930667a7fc47d.jpg',
        previewUrl: null,
        createdAt: '2026-01-22T11:47:30.189083270+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=3fb5b748-a74b-4a2f-bc64-ae12df98d300',
    },
    {
        messageId: '3fb5b748-a74b-4a2f-bc64-ae12df98d300',
        url: 'https://alfachannels.servicecdn.ru/ChannelsSB1/Whats_new/alfa_case_camp_2808.jpg',
        previewUrl: null,
        createdAt: '2026-01-22T11:47:30.189083270+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=3fb5b748-a74b-4a2f-bc64-ae12df98d300',
    },
    {
        messageId: '3fb5b748-a74b-4a2f-bc64-ae12df98d300',
        url: 'https://alfachannels.servicecdn.ru/AlfaChannels/TEST_A_CHANNELS/20251113only4.jpg',
        previewUrl: null,
        createdAt: '2026-01-22T11:47:30.189083270+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=3fb5b748-a74b-4a2f-bc64-ae12df98d300',
    },
    {
        messageId: 'sdkhb28yb9',
        url: 'https://alfavideo.servicecdn.ru/videos/101064_31s0hnwZaamhbwE/master.m3u8',
        bottomButton: {
            text: 'Кнопка с задержкой 2 секунды',
            onClick: () => {},
            timeout: 2,
        },
    },
    {
        messageId: 'cea9291c-30dd-4f14-b815-2eb805483207',
        url: 'https://alfachannels.servicecdn.ru/AlfaChannels_Test/BLOCKS_TEST/2025-04-02_11.15.35.jpg',
        previewUrl: null,
        createdAt: '2026-01-21T10:06:26.625883392+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=cea9291c-30dd-4f14-b815-2eb805483207',
    },
    {
        messageId: '3fb5b748-a74b-4a2f-bc64-ae12df98d300',
        url: 'https://alfachannels.servicecdn.ru/AlfaChannels/TEST_A_CHANNELS/20251113only1.jpg',
        previewUrl: null,
        createdAt: '2026-01-22T11:47:30.189083270+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=3fb5b748-a74b-4a2f-bc64-ae12df98d300',
    },
    {
        messageId: 'cea9291c-30dd-4f14-b815-2eb805483207',
        url: 'https://alfachannels.servicecdn.ru/ChannelsSB1/Whats_new/mortgage_18_2208.jpg',
        previewUrl: null,
        createdAt: '2026-01-21T10:06:26.625883392+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=cea9291c-30dd-4f14-b815-2eb805483207',
    },
    {
        messageId: 'mjiic8y3-0dd-4f14-b815-973748',
        url: 'https://alfachannels.servicecdn.ru/AlfaChannels/WHATS_NEW/IMG_4124.JPG',
        previewUrl: null,
        createdAt: '2026-01-21T10:06:26.625883392+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=cea9291c-30dd-4f14-b815-2eb805483207',
    },
    {
        messageId: 'cbdh38774-30dd-4f14-b815-34763',
        url: 'https://alfachannels.servicecdn.ru/ChannelsSB1/Whats_new/alfa_invest_2108.jpg',
        previewUrl: null,
        createdAt: '2026-01-21T10:06:26.625883392+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=cea9291c-30dd-4f14-b815-2eb805483207',
    },
    {
        messageId: 'cbdh38774-30dd-4f14-b815-34763',
        url: 'https://alfachannels.servicecdn.ru/AlfaChannels/ALFA_ONLY/20251117onlyspartak.jpg',
        previewUrl: null,
        createdAt: '2026-01-21T10:06:26.625883392+0000',
        deeplink: '/communication_source?id=COUNTER&messageId=cea9291c-30dd-4f14-b815-2eb805483207',
    },
];

const galleryImages = paginationMedia.map((item) => ({
    src: item.url,
    previewSrc: item.previewUrl ?? undefined,
    canDownload: false,
    messageId: item.messageId,
    name: 'Куда нажать',
    createdAt: item.createdAt,
    bottomButton: 'bottomButton' in item ? item.bottomButton : undefined,
}));

const MOCK_NETWORK_DELAY_MS = 1000;
const paginationKeys = [...new Set(galleryImages.map((item) => item.messageId))];

const getImagesBatch = (messageId: string) =>
    galleryImages.filter((item) => item.messageId === messageId);

const PaginatedGalleryExample = () => {
    const initialMessageId = paginationKeys[0];
    const [open, setOpen] = React.useState(false);
    const [shouldFailNextRequest, setShouldFailNextRequest] = React.useState(false);
    const [currentMessageId, setCurrentMessageId] = React.useState(initialMessageId);
    const [currentImages, setCurrentImages] = React.useState(() =>
        getImagesBatch(initialMessageId),
    );

    const openGallery = (withError = false) => {
        setShouldFailNextRequest(withError);
        setCurrentMessageId(initialMessageId);
        setCurrentImages(getImagesBatch(initialMessageId));
        setOpen(true);
    };

    const handleEdgeReached = async (direction: 'prev' | 'next') => {
        const currentPageIndex = paginationKeys.indexOf(currentMessageId);
        const offset = direction === 'next' ? 1 : -1;
        const targetMessageId = paginationKeys[currentPageIndex + offset];

        if (!targetMessageId) {
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, MOCK_NETWORK_DELAY_MS));

        if (shouldFailNextRequest) {
            setShouldFailNextRequest(false);
            throw new Error('Не удалось загрузить пачку медиа');
        }

        setCurrentImages(getImagesBatch(targetMessageId));
        setCurrentMessageId(targetMessageId);
    };

    const currentPageIndex = paginationKeys.indexOf(currentMessageId);

    return (
        <React.Fragment>
            <div style={{ margin: '24px' }}>
                <Button view='primary' onClick={() => openGallery()}>
                    Открыть пагинированную галерею
                </Button>
            </div>
            <div style={{ margin: '24px' }}>
                <Button view='primary' onClick={() => openGallery(true)}>
                    Открыть пагинированную галерею с ошибкой
                </Button>
            </div>
            <Gallery
                open={open}
                images={currentImages}
                onClose={() => setOpen(false)}
                navigateToPostHandler={() => {}}
                paginationConfig={{
                    onEdgeReached: handleEdgeReached,
                    hasPrevPage: currentPageIndex > 0,
                    hasNextPage: currentPageIndex < paginationKeys.length - 1,
                }}
            />
        </React.Fragment>
    );
};

export const gallery: Story = {
    name: 'Gallery',
    render: () => {
        const [openMultiple, setOpenMultiple] = React.useState(false);
        const [open, setOpen] = React.useState(false);

        const previewImages = [
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
                {previewImages.map((image, index) => (
                    <div
                        key={image.src}
                        style={{
                            width: '190px',
                            height: '190px',
                            backgroundSize: 'cover',
                            backgroundImage: `url(${image.src})`,
                            marginRight: index !== 2 ? '8px' : undefined,
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

                <PaginatedGalleryExample />
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
                            name: 'Photo.jpg',
                            src: 'https://pixabay.com/images/download/people-2944065_640.jpg?attachment',
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
                            name: 'Вертикальное изображение.jpg',
                            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA1MDAgMTAwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSIxMDAwIiBmaWxsPSIjNDU0Nzc4Ii8+Cjwvc3ZnPgo=',
                        },
                    ]}
                    loop={boolean('loop', true)}
                />
            </div>
        );
    },
};

export default meta;
