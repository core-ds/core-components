// url=https://www.figma.com/design/jDJxQE1knc3NySMBYYiBYf/Web----Core?node-id=1-3295
// source=packages/confirmation/src/desktop/component.desktop.tsx
// component=ConfirmationDesktop
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
const screen = instance.getEnum('Screen', {
    'Ввод разблокирован (Temp_Block_Over)': 'TEMP_BLOCK_OVER',
    Custom: 'CUSTOM',
    'Блокировка без таймера (Fatal_Error)': 'FATAL_ERROR',
    'Ввод кода (Initial)': 'INITIAL',
    'Временная блокировка (Temp_Block)': 'TEMP_BLOCK',
    'Не приходит сообщение (Hint)': 'HINT',
});
const align = instance.getEnum('Alignment', { Center: 'center', Left: 'left' });
if (!screen || !align) throw new Error('Неизвестный экран или выравнивание Confirmation');
if (screen === 'CUSTOM')
    throw new Error('Custom не содержит настоящего SLOT и не задаёт getScreensMap');
function text(owner: InstanceHandle, name: string) {
    const node = owner.findText(name);
    if (!node || node.type !== 'TEXT') throw new Error(`Не найден текст ${name}`);
    return node.textContent;
}
function timer(owner: InstanceHandle, name: string) {
    const value = text(owner, name);
    if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(value)) throw new Error('Неизвестный формат таймера');
    return value.split(':').reduce((total, part) => total * 60 + Number(part), 0) * 1000;
}
const title = text(instance, 'Title');
const descriptions = instance
    .findLayers((node) => node.type === 'TEXT' && node.name === 'Text')
    .filter((node) => node.type === 'TEXT')
    .map((node) => (node.type === 'TEXT' ? node.textContent : ''));
const texts: Record<string, string> = {};
let state = 'INITIAL';
let phone: string | undefined;
let requiredCharAmount: number | undefined;
let countdown: number | undefined;
let tempBlockDuration: number | undefined;
let blockSmsRetry = false;
const button = instance.findInstance('[D] Button');
const buttonLabel = button && button.type === 'INSTANCE' ? button.getString('✎ Label') : undefined;
if (screen === 'INITIAL') {
    texts.title = title;
    const phoneText = descriptions[0];
    if (phoneText && !phoneText.startsWith('Отправили на '))
        throw new Error('Подпись под заголовком не соответствует phone API');
    phone = phoneText?.replace(/^Отправили на\s+/, '');
    let block = instance.findInstance('CodeInputBlockCenter');
    if (block.type !== 'INSTANCE') block = instance.findInstance('CodeInputBlockLeft');
    if (block.type !== 'INSTANCE') throw new Error('Не найден CodeInputBlock');
    const fieldState = block.getEnum('State', { Default: 'INITIAL', Error: 'CODE_ERROR' });
    if (!fieldState) throw new Error('Неизвестный State CodeInputBlock');
    state = fieldState;
    const fields = block.findLayers(
        (node) => node.type === 'INSTANCE' && node.name === 'CodeInputDigit',
        { traverseInstances: true },
    );
    requiredCharAmount = fields.length;
    if (!requiredCharAmount) throw new Error('Не определена длина CodeInput');
    const errors = block
        .findLayers((node) => node.type === 'TEXT', { traverseInstances: true })
        .filter((node) => node.type === 'TEXT')
        .map((node) => (node.type === 'TEXT' ? node.textContent : ''));
    if (fieldState === 'CODE_ERROR' && errors.length) texts.codeError = errors[errors.length - 1];
    let resend = instance.findInstance('ResendBlockCenter');
    if (resend.type !== 'INSTANCE') resend = instance.findInstance('ResendBlockLeft');
    if (resend.type !== 'INSTANCE') throw new Error('Не найден ResendBlock');
    const resendState = resend.getEnum('Вариант', {
        'Кнопка запросить код': 'button',
        'Спиннер обработка запроса': 'sending',
        'Не осталось попыток': 'blocked',
        'Код отправлен': 'sent',
        'Запросить новый': 'countdown',
    });
    if (!resendState) throw new Error('Неизвестный вариант повторной отправки');
    if (resendState === 'sent')
        throw new Error('Код отправлен — переходное состояние, у него нет отдельного props');
    if (resendState === 'sending') state = 'CODE_SENDING';
    blockSmsRetry = resendState === 'blocked';
    countdown = resendState === 'countdown' ? timer(resend, 'Countdown') : 0;
    let bottom = instance.findInstance('BottomAddonCenter');
    if (bottom.type !== 'INSTANCE') bottom = instance.findInstance('BottomAddonLeft');
    if (bottom.type !== 'INSTANCE') throw new Error('Не найден BottomAddon');
    const kind = bottom.getEnum('Content', { SwapMe: 'custom', Default: 'default' });
    if (kind !== 'default') throw new Error('BottomAddon=SwapMe не содержит настоящего SLOT');
    // Label находится внутри вложенного Link/Button. Поиск по умолчанию останавливается на INSTANCE.
    const hintLabel = bottom.findText('Label', { traverseInstances: true });
    if (!hintLabel || hintLabel.type !== 'TEXT')
        throw new Error('Не найден текст Label в BottomAddon');
    texts.linkToHint = hintLabel.textContent;
} else if (screen === 'HINT') {
    texts.hintTitle = title;
    texts.hintDescription = descriptions[0];
    texts.hintNotification = descriptions[1];
    if (buttonLabel !== undefined) texts.hintButton = buttonLabel;
    const numbers = instance
        .findLayers((node) => node.type === 'TEXT' && /^(\+7|8 800)/.test(node.textContent), {
            traverseInstances: true,
        })
        .filter((node) => node.type === 'TEXT')
        .map((node) => (node.type === 'TEXT' ? node.textContent : ''));
    const international = numbers.find((value) => value.startsWith('+7'));
    const domestic = numbers.find((value) => value.startsWith('8 800'));
    if (international) texts.internationalPhone = international;
    if (domestic) texts.domesticPhone = domestic;
} else {
    const keys: Record<string, [string, string, string]> = {
        FATAL_ERROR: ['fatalErrorTitle', 'fatalErrorDescription', 'fatalErrorButton'],
        TEMP_BLOCK: ['tempBlockTitle', 'tempBlockDescription', ''],
        TEMP_BLOCK_OVER: ['tempBlockOverTitle', 'tempBlockOverDescription', 'tempBlockOverButton'],
    };
    const key = keys[screen];
    texts[key[0]] = title;
    texts[key[1]] = descriptions[0];
    if (key[2] && buttonLabel !== undefined) texts[key[2]] = buttonLabel;
    if (screen === 'TEMP_BLOCK') tempBlockDuration = timer(instance, 'Timer Text');
}
export default {
    id: 'core-confirmation-desktop',
    imports: [
        "import React from 'react';",
        "import { ConfirmationDesktop } from '@alfalab/core-components/confirmation/desktop';",
        "import type { DesktopConfirmationProps } from '@alfalab/core-components/confirmation/desktop';",
    ],
    example: figma.code`function Example({ onChangeState, onChangeScreen, onInputFinished, onSmsRetryClick, onFatalErrorOkButtonClick, onTempBlockFinished }: Pick<DesktopConfirmationProps, 'onChangeState' | 'onChangeScreen' | 'onInputFinished' | 'onSmsRetryClick' | 'onFatalErrorOkButtonClick' | 'onTempBlockFinished'>) {
    const [currentScreen, setScreen] = React.useState<string>(${JSON.stringify(screen)});
    const [currentState, setState] = React.useState<string>(${JSON.stringify(state)});
    return <ConfirmationDesktop screen={currentScreen} state={currentState} alignContent="${align}" texts={${JSON.stringify(texts)}}
        ${figma.helpers.react.renderProp('phone', phone)} ${figma.helpers.react.renderProp('requiredCharAmount', requiredCharAmount)}
        ${figma.helpers.react.renderProp('countdownDuration', countdown)} ${figma.helpers.react.renderProp('tempBlockDuration', tempBlockDuration)} ${blockSmsRetry ? 'blockSmsRetry' : ''}
        onChangeState={value => { setState(value); onChangeState(value); }}
        onChangeScreen={value => { setScreen(value); onChangeScreen(value); }}
        onInputFinished={onInputFinished} onSmsRetryClick={onSmsRetryClick}
        onFatalErrorOkButtonClick={onFatalErrorOkButtonClick} onTempBlockFinished={onTempBlockFinished} />;
}`,
    metadata: { nestable: false },
};
