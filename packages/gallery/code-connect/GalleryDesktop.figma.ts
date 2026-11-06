// url=https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp/Web-Core?node-id=2929-19076
// source=packages/gallery/src/Component.tsx
// component=Gallery
import figma from 'figma';
const instance = figma.selectedInstance;
const media = instance.getEnum('Type', { Video: 'video', Image: 'image' });
if (media === undefined) throw new Error('Неизвестный тип Gallery');
// Gallery адаптивен; отдельного публичного desktop/mobile API нет.
// URL изображений или видео отсутствуют в свойствах Figma.

export default {
    id: 'core-GalleryDesktop',
    imports: ["import { Gallery, type GalleryProps } from '@alfalab/core-components/gallery';"],
    example: figma.code`function Example({ open, images, onClose }: Pick<GalleryProps, 'open' | 'images' | 'onClose'>) {
  return <Gallery open={open} images={images} onClose={onClose} />;
}`,
    metadata: {
        nestable: false,
        props: {
            contextFields: ['open', 'images', 'onClose'],
            contextReason: 'Figma не предоставляет URL медиа и состояние открытия Gallery',
        },
    },
};
