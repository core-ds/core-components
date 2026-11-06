// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=20260-111
// source=packages/product-cover/src/index.ts
// component=ProductCover.Stack
import figma from 'figma';
const instance = figma.selectedInstance;
const size = instance.getEnum('Preset', {
    '164x264 Left': 'unsupported',
    '40x65 RightBottom': 40,
    '40x65 Bottom': 40,
    '32x51 RightBottom': 32,
    '16x24 RightBottom': 16,
});
const align = instance.getEnum('Preset', {
    '164x264 Left': 'default',
    '40x65 RightBottom': 'default',
    '40x65 Bottom': 'bottom',
    '32x51 RightBottom': 'default',
    '16x24 RightBottom': 'default',
});
const more = instance.getEnum('CardAmount', { Two: false, MoreThanTwo: true });
if (!size || !align || more === undefined)
    throw new Error('Неизвестный вариант ProductCover.Stack');
if (size === 'unsupported')
    throw new Error(
        'Preset 164x264 Left отсутствует в актуальном StackProps: size исключает 164; требуется решение владельца',
    );
export default {
    id: 'core-product-cover-stack',
    imports: [
        "import { ProductCover, type StackProps } from '@alfalab/core-components/product-cover';",
    ],
    example: figma.code`function Example({ firstCard, secondCard${more ? ', numberOfCards' : ''} }: { firstCard: NonNullable<StackProps['firstCard']>; secondCard: NonNullable<StackProps['secondCard']>; ${more ? 'numberOfCards: number;' : ''} }) {
        ${more ? 'if (!Number.isSafeInteger(numberOfCards) || numberOfCards <= 2) throw new Error("numberOfCards должен быть целым числом больше 2");' : ''}
        return <ProductCover.Stack size={${size}} align="${align}" firstCard={firstCard} secondCard={secondCard} numberOfCards={${more ? 'numberOfCards' : '2'}} />;
    }`,
    metadata: { nestable: false },
};
