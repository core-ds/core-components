// url=https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=5606-1538
// source=packages/page-indicator/src/components/runner/Component.tsx
// component=PageIndicatorRunner
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
const items = instance
    .findLayers((node) => node.type === 'INSTANCE' && node.name === 'Item')
    .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
if (items.length < 2) throw new Error('PageIndicator должен содержать минимум два Item');
const selected = items.map((item) => flag(item, 'Active'));
if (selected.filter(Boolean).length !== 1) throw new Error('Должен быть выбран ровно один Item');
const activeElement = selected.indexOf(true);
export default {
    id: 'core-page-indicator-runner',
    imports: ["import { PageIndicatorRunner } from '@alfalab/core-components/page-indicator';"],
    example: figma.code`<PageIndicatorRunner colors="${colors}" activeElement={${activeElement}} elements={${items.length}} />`,
    metadata: { nestable: true },
};
