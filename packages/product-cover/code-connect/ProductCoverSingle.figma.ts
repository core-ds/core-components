// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=20260-3
// source=packages/product-cover/src/index.ts
// component=ProductCover.Single
import figma from 'figma';
const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
    '16x24': 16,
    '32x51': 32,
    '40x65': 40,
    '48x76': 48,
    '96x152': 96,
    '128x205': 128,
    '164x264': 164,
});
if (!size) throw new Error('Неизвестный Size ProductCover');
const shadow = instance.getBoolean('Shadow');
const border = instance.getBoolean('Border');
const overlay = instance.getBoolean('Overlay');
const details = instance.getBoolean('Details');
const image = instance.getBoolean('CardImage');
let iconCode;
if (size !== 16 && instance.getBoolean('Icon')) {
    const icon = instance.getInstanceSwap(size <= 32 ? 'icon 16' : 'icon 24');
    if (!icon || icon.type !== 'INSTANCE') throw new Error('Не найдена иконка ProductCover');
    iconCode = icon.executeTemplate().example;
}
export default {
    id: 'core-product-cover-single',
    imports: [
        "import { ProductCover, type SingleProps } from '@alfalab/core-components/product-cover';",
    ],
    example: figma.code`function Example({ appearance${image ? ', image' : ''}${details ? ', details' : ''}${overlay ? ', overlayColors' : ''} }: { appearance: Pick<SingleProps, 'backgroundColor' | 'iconColor' | 'textColor'${shadow ? " | 'shadow'" : ''}${border ? " | 'borderColor'" : ''}>; ${image ? "image: Pick<SingleProps, 'cardId' | 'baseUrl' | 'layers'>; " : ''}${details ? "details: Pick<SingleProps, 'cardNumber' | 'cardholderName' | 'cardholderNameUppercase' | 'eyeButton'>; " : ''}${overlay ? "overlayColors: NonNullable<SingleProps['overlayProps']>['colors'];" : ''} }) {
        return <ProductCover.Single {...appearance} ${image ? '{...image}' : ''} ${details ? '{...details}' : ''} size={${size}} ${iconCode ? figma.code`icon={() => <>${iconCode}</>}` : ''} overlayProps={{ visible: ${overlay ? 'true' : 'false'}${overlay ? ', colors: overlayColors' : ''} }} />;
    }`,
    metadata: { nestable: false },
};
