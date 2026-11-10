// url=https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=5601-2720
// source=packages/page-indicator/src/components/bullet/Component.tsx
// component=PageIndicatorBullet
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
function booleanProperty(owner: InstanceHandle, name: string): boolean {
    const value = owner.getBoolean(name);
    if (typeof value !== 'boolean') throw new Error(`Не прочитано логическое свойство ${name}`);
    return value;
}
function flag(owner: InstanceHandle, name: string): boolean {
    const value = owner.getEnum(name, { False: false, True: true });
    if (typeof value !== 'boolean') throw new Error(`Неизвестное значение ${name}`);
    return value;
}
function nested(owner: InstanceHandle, name: string): InstanceHandle {
    const child = owner.findInstance(name);
    if (!child || child.type !== 'INSTANCE') throw new Error(`Не найден блок ${name}`);
    return child;
}
const inverted = flag(instance, 'Inverted');
const staticColors = flag(instance, 'Static');
const colors = staticColors
    ? inverted
        ? 'static-inverted'
        : 'static'
    : inverted
      ? 'inverted'
      : 'default';
const size = instance.getEnum('Size', { '8': 8, '6': 6 });
if (size === undefined) throw new Error('Неизвестный размер PageIndicator');
const items = instance
    .findLayers((node) => node.type === 'INSTANCE' && node.name === 'Item')
    .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
if (items.length < 2) throw new Error('PageIndicator должен содержать минимум два Item');
const selected = items.map((item) => flag(item, 'Active'));
if (selected.filter(Boolean).length !== 1) throw new Error('Должен быть выбран ровно один Item');
const activeElement = selected.indexOf(true);
// Диаметры менее 100% обозначают окно большего списка; его полная длина в Figma не задана.
for (const item of items) {
    const diameter = item.getEnum('Diameter', { '100%': 100, '75%': 75, '50%': 50 });
    if (diameter === undefined) throw new Error('Неизвестный Diameter');
    if (diameter !== 100 || items.length > 5)
        throw new Error('Суженные Bullet требуют полной длины списка и позиции окна');
}
export default {
    id: 'core-page-indicator-bullet',
    imports: ["import { PageIndicatorBullet } from '@alfalab/core-components/page-indicator';"],
    example: figma.code`<PageIndicatorBullet colors="${colors}" size={${size}} activeElement={${activeElement}} elements={${items.length}} />`,
    metadata: { nestable: true },
};
