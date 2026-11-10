// url=https://www.figma.com/design/jDJxQE1knc3NySMBYYiBYf/Web----Core?node-id=2351-12645
// source=packages/pattern-lock/src/mobile/Component.mobile.tsx
// component=PatternLockMobile
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
const forgot = flag(instance, 'ForgetPassword');
const pad = nested(instance, '🔩 PatternPad');
const normal = flag(pad, 'DefaultState');
const active = flag(pad, 'ActiveState');
const success = flag(pad, 'SuccessState');
const error = flag(pad, 'ErrorState');
if (!normal || active || success || error)
    throw new Error(
        'Нарисованный PatternPad требует восстановления выбранного пути через API canvas',
    );
let label;
if (forgot) {
    const button = nested(instance, '[M] Button');
    label = button.getString('✎ Label');
}
export default {
    id: 'core-pattern-lock',
    imports: [
        "import { PatternLockMobile } from '@alfalab/core-components/pattern-lock/mobile';",
        "import type { PatternLockMobileProps } from '@alfalab/core-components/pattern-lock/mobile';",
    ],
    example: figma.code`function Example({ onComplete${forgot ? ', onForgotBtnClick' : ''} }: { onComplete?: PatternLockMobileProps['onComplete']; ${forgot ? "onForgotBtnClick: NonNullable<PatternLockMobileProps['onForgotBtnClick']>;" : ''} }) {
    return <PatternLockMobile onComplete={onComplete} ${forgot ? figma.code`showForgotCodeBtn onForgotBtnClick={onForgotBtnClick} ${figma.helpers.react.renderProp('forgotCodeBtnText', label)}` : ''} />;
}`,
    metadata: { nestable: false },
};
