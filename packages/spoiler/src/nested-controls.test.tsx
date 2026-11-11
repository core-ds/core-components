import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Spoiler } from './Component';

jest.mock('./hooks/use-particles', () => ({
    useParticles: () => {
        const { useRef } = jest.requireActual('react');
        return {
            rootRef: useRef(null),
            contentRef: useRef(null),
            anchorRef: useRef(null),
            canvasRef: useRef(null),
            ready: false,
        };
    },
}));

describe.each(['text', 'element'] as const)('Вложенные элементы Spoiler: %s', (mode) => {
    it.each([
        [
            'ссылка',
            <a href='#track' data-test-id='target'>
                RA123
            </a>,
            'Enter',
        ],
        [
            'кнопка',
            <button type='button' data-test-id='target'>
                Скопировать
            </button>,
            'Enter',
        ],
        ['поле ввода', <input aria-label='Комментарий' data-test-id='target' />, ' '],
    ])('%s: клавиша не отменяется и не скрывает содержимое', (_, child, key) => {
        const onOpenChange = jest.fn();
        render(
            <Spoiler mode={mode} defaultOpen onOpenChange={onOpenChange}>
                {child}
            </Spoiler>,
        );

        expect(fireEvent.keyDown(screen.getByTestId('target'), { key })).toBe(true);
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(screen.getByTestId('target').closest('[data-spoiler-content]')).not.toHaveAttribute(
            'inert',
        );
    });

    it.each([
        [
            'ссылка',
            <a href='#track'>
                <span data-test-id='target'>RA123</span>
            </a>,
        ],
        [
            'кнопка',
            <button type='button'>
                <span data-test-id='target'>Скопировать</span>
            </button>,
        ],
        ['поле ввода', <input aria-label='Комментарий' data-test-id='target' />],
        [
            'summary',
            <details>
                <summary data-test-id='target'>Подробнее</summary>Текст
            </details>,
        ],
        [
            'contentEditable',
            <span contentEditable suppressContentEditableWarning>
                <span data-test-id='target'>Текст</span>
            </span>,
        ],
        [
            'label',
            <label data-test-id='target'>
                Согласие
                <input type='checkbox' />
            </label>,
        ],
        [
            'tabIndex',
            <span tabIndex={0} data-test-id='target'>
                Контрол
            </span>,
        ],
        [
            'role',
            <span role='button' data-test-id='target'>
                Контрол
            </span>,
        ],
    ])('%s: клик и пользовательский обработчик работают без скрытия', (_, child) => {
        const onOpenChange = jest.fn();
        const onClick = jest.fn();
        render(
            <Spoiler mode={mode} defaultOpen onOpenChange={onOpenChange} onClick={onClick}>
                {child}
            </Spoiler>,
        );

        expect(fireEvent.click(screen.getByTestId('target'))).toBe(true);
        expect(onClick).toHaveBeenCalled();
        expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('обычный текст скрывает содержимое, Enter на триггере раскрывает', async () => {
        const user = userEvent.setup();
        render(
            <Spoiler mode={mode} defaultOpen dataTestId='root'>
                <span data-test-id='text'>Баланс</span>
            </Spoiler>,
        );
        fireEvent.click(screen.getByTestId('text'));
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
        await user.tab();
        await user.keyboard('{Enter}');
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('разделяет триггер и вложенные контролы и сохраняет порядок Tab', async () => {
        const user = userEvent.setup();
        const onAction = jest.fn();
        render(
            <>
                <button type='button'>До спойлера</button>
                <Spoiler mode={mode} dataTestId='root'>
                    <button type='button' onClick={onAction}>
                        Действие
                    </button>
                    <a href='#details'>Подробнее</a>
                </Spoiler>
                <button type='button'>После спойлера</button>
            </>,
        );
        const trigger = screen.getByRole('button', { name: /Показать скрыт/ });

        await user.tab();
        expect(screen.getByRole('button', { name: 'До спойлера' })).toHaveFocus();
        await user.tab();
        expect(trigger).toHaveFocus();
        await user.keyboard('{Enter}');
        const action = screen.getByRole('button', { name: 'Действие' });
        expect(action.parentElement?.closest('button, [role="button"]')).toBeNull();
        expect(screen.getByTestId('root')).not.toHaveAttribute('role');
        expect(document.getElementById(trigger.getAttribute('aria-controls')!)).toContainElement(
            action,
        );
        await user.tab();
        expect(action).toHaveFocus();
        await user.keyboard(' ');
        expect(onAction).toHaveBeenCalledTimes(1);
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        await user.tab();
        expect(screen.getByRole('link')).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'После спойлера' })).toHaveFocus();
    });

    it('с revealOnce оставляет фокус на триггере до перехода к вложенной кнопке', async () => {
        const user = userEvent.setup();
        render(
            <Spoiler mode={mode} revealOnce>
                <button type='button'>Действие</button>
            </Spoiler>,
        );
        const trigger = screen.getByRole('button', { name: /Показать скрыт/ });
        await user.tab();
        await user.keyboard('{Enter}');
        expect(trigger).toHaveFocus();
        expect(trigger).toHaveAttribute('aria-disabled', 'true');
        await user.tab();
        expect(screen.getByRole('button', { name: 'Действие' })).toHaveFocus();
        await user.tab({ shift: true });
        expect(trigger).not.toHaveFocus();
    });
});
