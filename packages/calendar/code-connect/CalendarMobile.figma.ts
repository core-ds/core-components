// url=https://www.figma.com/design/JVZ7gCqW42KnxGsu19aqyF/Web----Core?node-id=207-52512
// source=packages/calendar/src/components/calendar-mobile/calendarMonthOnlyView.tsx
// component=CalendarMonthOnlyView
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
const view = instance.getEnum('Configutation', { Day: 'days', Month: 'months', Year: 'years' });
if (!view) throw new Error('Неизвестная Configutation Calendar');
const type = instance.getEnum('Type', { Select: 'full', Slider: 'month-only' });
if (!type) throw new Error('Неизвестный Type Calendar');
if (type === 'month-only' && view !== 'days')
    throw new Error('Slider поддерживает только Configutation=Day');
// month/value/offDays/events/holidays задаёт продукт. Иллюстративные дни Figma не являются датами.
let shape: string | undefined;
const days = instance.findInstance('Days');
if (days && days.type === 'INSTANCE') {
    shape = days.getEnum('Shape', { Rounded: 'rounded', Rectangular: 'rectangular' });
    if (!shape) throw new Error('Неизвестный Shape дней');
}
const monthNodes = instance
    .findLayers((node) => node.type === 'INSTANCE' && node.name === 'MonthMobile')
    .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
const clickable = monthNodes.map((month) => flag(month, 'clickableMonth'));
if (clickable.some((value) => value !== clickable[0]))
    throw new Error('clickableMonth должен быть одинаковым для всех месяцев');
export default {
    id: 'core-calendar-mobile',
    imports: [
        "import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';",
        "import type { CalendarDesktopProps } from '@alfalab/core-components/calendar/desktop';",
        "import { CalendarMonthOnlyView, CalendarMonthOnlyViewHeader } from '@alfalab/core-components/calendar/mobile';",
    ],
    example: figma.code`function Example({ month, value, onChange, onMonthChange, mode, minDate, maxDate, offDays, events, holidays }: Pick<CalendarDesktopProps, 'value' | 'onChange' | 'onMonthChange' | 'mode' | 'minDate' | 'maxDate' | 'offDays' | 'events' | 'holidays'> & { month: number }) {
    if (!Number.isFinite(month)) throw new Error('Передай реальный timestamp месяца');
    return ${type === 'month-only' ? figma.code`<><CalendarMonthOnlyViewHeader /><CalendarMonthOnlyView month={month} value={value} onChange={onChange} mode={mode} minDate={minDate} maxDate={maxDate} offDays={offDays} events={events} holidays={holidays} ${clickable[0] ? 'clickableMonth' : ''} ${figma.helpers.react.renderProp('shape', shape)} /></>` : figma.code`<CalendarDesktop mobile responsive selectorView="full" defaultView="${view}" month={month} value={value} onChange={onChange} onMonthChange={onMonthChange} mode={mode} minDate={minDate} maxDate={maxDate} offDays={offDays} events={events} holidays={holidays} ${figma.helpers.react.renderProp('shape', shape)} />`};
}`,
    metadata: { nestable: false },
};
