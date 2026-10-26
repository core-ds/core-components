// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=448-17257
// source=packages/icon-view/src/components/index.ts
// component=IconView
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
    '16': 16,
    '20': 20,
    '24': 24,
    '32': 32,
    '40': 40,
    '48': 48,
    '56': 56,
    '64': 64,
    '72': 72,
    '80': 80,
    '128': 128,
});
const hasShape = instance.getBoolean('Shape');
const shape = instance.findInstance('Shape');
if (hasShape && shape.type !== 'INSTANCE') throw new Error('Не найдена форма IconView');
const component = !hasShape
    ? 'NoShape'
    : shape.type === 'INSTANCE'
      ? shape.getEnum('Form', {
            Superellipse: 'SuperEllipse',
            Circle: 'Circle',
            Rectangle: 'Rectangle',
        })
      : undefined;
if (!component) throw new Error('Неизвестная форма IconView');
const imports = [`import { ${component} } from '@alfalab/core-components/icon-view';`];
const border = instance.getBoolean('Border');
const bgColor = instance.getBoolean('BgColor');
const bgImg = instance.getBoolean('BgImg');
const hasText = instance.getBoolean('Text');
const text = hasText ? instance.getString('✎ Text') : undefined;
let contentCode;
let mainSize;
if (instance.getBoolean('Content')) {
    const content = instance.findInstance('Content');
    if (content.type !== 'INSTANCE') throw new Error('Не найден Content IconView');
    const type = content.getPropertyValue('Type');
    const contentSize = String(content.getPropertyValue('Size'));
    mainSize = Number.parseInt(contentSize, 10);
    const property =
        type === 'Logo'
            ? 'Logo'
            : type === 'Emoji'
              ? 'Emoji'
              : contentSize.startsWith('20')
                ? 'icon-20'
                : contentSize === '16'
                  ? 'Icon 16'
                  : 'Icon 24';
    const child = content.getInstanceSwap(property);
    if (!child || child.type !== 'INSTANCE') throw new Error('Не найден выбранный ассет IconView');
    contentCode = child.executeTemplate().example;
}
function nested(name: string, enabled: boolean) {
    if (!enabled) return undefined;
    let child = instance.findInstance(name);
    if (child.type !== 'INSTANCE' && (name === 'TopAddon' || name === 'BottomAddon')) {
        child = instance.findInstance('IconView', { path: [name] });
    }
    if (child.type !== 'INSTANCE') throw new Error(`Не найден ${name}`);
    const result = child.executeTemplate().example;
    if (
        result.some(
            (section) => section.type === 'CODE' && section.code.trim().startsWith('function '),
        )
    ) {
        throw new Error('Вложенный IconView требует передачи контекста цвета/изображения');
    }
    return result;
}
const top = nested('TopAddon', instance.getBoolean('TopAddon'));
const bottom = nested('BottomAddon', instance.getBoolean('BottomAddon'));
const indicator = nested('Indicator', instance.getBoolean('Indicator'));
if (!hasShape && (top || bottom || indicator))
    throw new Error('NoShape не поддерживает addons/indicator');
// Цвет и URL фонового изображения не являются component properties Figma.
// Они — явные параметры примера, а не выдуманные значения из макета.
const parameters = [
    bgColor ? 'backgroundColor: string' : '',
    bgImg ? 'imageUrl: string' : '',
].filter(Boolean);
const names = [bgColor ? 'backgroundColor' : '', bgImg ? 'imageUrl' : ''].filter(Boolean);
const opening = parameters.length
    ? `function Example({ ${names.join(', ')} }: { ${parameters.join('; ')} }) { return (`
    : '';
const closing = parameters.length ? '); }' : '';
export default {
    id: 'core-icon-view',
    imports,
    example: figma.code`${opening}<${component} size={${size}}
        ${hasShape ? figma.code`border={${border ? 'true' : 'false'}}` : ''}
        ${bgColor ? 'backgroundColor={backgroundColor}' : 'backgroundColor="transparent"'}
        ${bgImg ? 'imageUrl={imageUrl}' : ''} ${figma.helpers.react.renderProp('text', text)}
        ${mainSize ? figma.code`mainSize={${mainSize}}` : ''}
        ${top ? figma.code`topAddons={${top}}` : ''} ${bottom ? figma.code`bottomAddons={${bottom}}` : ''}
        ${indicator ? figma.code`indicator={${indicator}}` : ''}
    >${contentCode || ''}</${component}>${closing}`,
    metadata: { nestable: false },
};
