import React from 'react';
import { Button } from '@alfalab/core-components-button';
import { Gallery } from '@alfalab/core-components-gallery';

const images = [
    {
        name: 'Горизонтальное изображение.jpg',
        src: 'https://unsplash.com/photos/ywiAen4L4qA/download?force=true',
    },
    {
        name: 'Вертикальное изображение.jpg',
        src: 'https://unsplash.com/photos/J3WbMATCz8I/download?force=true',
    },
    {
        name: 'Маленькое изображение.jpg',
        src: 'https://picsum.photos/100/100',
    },
    {
        name: 'Битое изображение.jpg',
        src: 'https://picsum.photos',
    },
    {
        name: 'Изображение с прозрачностью.png',
        src: 'https://clipart-best.com/img/bush/bush-clip-art-22.png',
    },
];

const GalleryExample = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Button
                view='primary'
                onClick={() => {
                    setOpen(true);
                }}
            >
                Открыть галерею
            </Button>

            <Gallery
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                images={[...images, ...images, ...images, ...images, ...images]}
            />
        </div>
    );
};

export default GalleryExample;
