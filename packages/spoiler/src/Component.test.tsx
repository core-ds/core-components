import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
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

describe('Spoiler', () => {
    afterEach(() => jest.restoreAllMocks());

    it('сохраняет состояние вложенного компонента при скрытии блока', () => {
        const Counter = () => {
            const [count, setCount] = React.useState(0);
            return (
                <button type='button' onClick={() => setCount((value) => value + 1)}>
                    {count}
                </button>
            );
        };
        const { rerender } = render(
            <Spoiler mode='element' hide={false} revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        rerender(
            <Spoiler mode='element' hide revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        rerender(
            <Spoiler mode='element' hide={false} revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    });

    it('раскрывает текст по клику и скрывает повторным кликом', () => {
        const onHideChange = jest.fn();
        const { container } = render(<Spoiler onHideChange={onHideChange}>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');
        const content = container.querySelector('[data-spoiler-content]');

        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(trigger.closest('[data-state]')).toHaveAttribute('data-state', 'revealed');
        expect(content).not.toHaveAttribute('aria-hidden', 'true');
        expect(screen.getByRole('button', { name: 'Скрыть содержимое' })).toBe(trigger);
        expect(trigger).toHaveAttribute('aria-controls', content!.id);
        expect(trigger).not.toContainElement(content as HTMLElement);
        expect(onHideChange).toHaveBeenLastCalledWith(false);

        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(content).toHaveAttribute('aria-hidden', 'true');
        expect(onHideChange).toHaveBeenLastCalledWith(true);
    });

    it.each(['text', 'element'] as const)(
        'переключает Spoiler в режиме %s внутри панели с tabindex',
        (mode) => {
            render(
                <div role='tabpanel' tabIndex={0}>
                    <Spoiler mode={mode} defaultHide={false} dataTestId='spoiler'>
                        Скрытый текст
                    </Spoiler>
                </div>,
            );
            const root = screen.getByTestId('spoiler');

            fireEvent.click(screen.getByText('Скрытый текст'));
            expect(root).toHaveAttribute('data-state', 'hidden');

            // У скрытого содержимого отключены pointer events, клик принимает корень.
            fireEvent.click(root);
            expect(root).toHaveAttribute('data-state', 'revealed');
        },
    );

    it.each(['{Enter}', ' '])('переключает скрытый текст клавишей %p', async (key) => {
        const user = userEvent.setup();
        const onHideChange = jest.fn();

        render(<Spoiler onHideChange={onHideChange}>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');

        await user.tab();
        await user.keyboard(key);

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(onHideChange).toHaveBeenLastCalledWith(false);

        await user.keyboard(key);

        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(onHideChange).toHaveBeenLastCalledWith(true);
    });

    it('с revealOnce раскрывается один раз и становится неинтерактивным', () => {
        const onClick = jest.fn();
        const onHideChange = jest.fn();

        render(
            <Spoiler revealOnce dataTestId='spoiler' onClick={onClick} onHideChange={onHideChange}>
                Скрытый текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        fireEvent.click(root);

        expect(onHideChange).toHaveBeenCalledTimes(1);
        expect(onHideChange).toHaveBeenCalledWith(false);
        expect(root).toHaveAttribute('data-state', 'revealed');
        expect(root).not.toHaveAttribute('role');
        expect(root).not.toHaveAttribute('aria-expanded');
        expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(root);

        expect(onClick).toHaveBeenCalledTimes(2);
        expect(onHideChange).toHaveBeenCalledTimes(1);
        expect(root).toHaveAttribute('data-state', 'revealed');
    });

    it.each(['{Enter}', ' '])(
        'с revealOnce раскрывается клавишей %p только один раз',
        async (key) => {
            const user = userEvent.setup();
            const onKeyDown = jest.fn();
            const onHideChange = jest.fn();

            render(
                <Spoiler
                    revealOnce
                    dataTestId='spoiler'
                    onKeyDown={onKeyDown}
                    onHideChange={onHideChange}
                >
                    Скрытый текст
                </Spoiler>,
            );
            const root = screen.getByTestId('spoiler');

            act(() => screen.getByRole('button').focus());
            await user.keyboard(key);
            await user.keyboard(key);

            expect(onKeyDown).toHaveBeenCalledTimes(2);
            expect(onHideChange).toHaveBeenCalledTimes(1);
            expect(onHideChange).toHaveBeenCalledWith(false);
            expect(root).toHaveAttribute('data-state', 'revealed');
        },
    );

    it('в управляемом режиме revealOnce снова разрешает раскрытие после hide=true', () => {
        const onHideChange = jest.fn();
        const { rerender } = render(
            <Spoiler revealOnce hide onHideChange={onHideChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));
        expect(onHideChange).toHaveBeenLastCalledWith(false);
        rerender(
            <Spoiler revealOnce hide={false} onHideChange={onHideChange}>
                Скрытый текст
            </Spoiler>,
        );
        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
        rerender(
            <Spoiler revealOnce hide onHideChange={onHideChange}>
                Скрытый текст
            </Spoiler>,
        );
        onHideChange.mockClear();

        fireEvent.click(screen.getByRole('button'));

        expect(onHideChange).toHaveBeenCalledWith(false);
    });

    it('revealOnce не влияет на ручной режим и defaultHide=false сразу неинтерактивен', () => {
        const { rerender } = render(
            <Spoiler revealOnce revealOn='manual' hide dataTestId='spoiler'>
                Скрытый текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        fireEvent.click(root);
        expect(root).toHaveAttribute('data-state', 'hidden');
        expect(root).not.toHaveAttribute('tabindex');

        rerender(
            <Spoiler key='revealed-once' revealOnce defaultHide={false} dataTestId='spoiler-once'>
                Скрытый текст
            </Spoiler>,
        );
        const open = screen.getByTestId('spoiler-once');
        expect(open).toHaveAttribute('data-state', 'revealed');
        expect(open).not.toHaveAttribute('role');
        expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('не скрывает раскрытый текст при выделении внутри спойлера', () => {
        const onHideChange = jest.fn();

        render(
            <Spoiler defaultHide={false} dataTestId='spoiler' onHideChange={onHideChange}>
                Выделенный текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');
        const textNode = screen.getByText('Выделенный текст').firstChild;

        jest.spyOn(window, 'getSelection').mockReturnValue({
            isCollapsed: false,
            toString: () => 'Выделенный текст',
            anchorNode: textNode,
            focusNode: textNode,
        } as Selection);

        fireEvent.click(root);

        expect(root).toHaveAttribute('data-state', 'revealed');
        expect(onHideChange).not.toHaveBeenCalled();
    });

    it('игнорирует клавиши, которые не активируют кнопку', () => {
        const onHideChange = jest.fn();

        render(<Spoiler onHideChange={onHideChange}>Скрытый текст</Spoiler>);

        fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });
        fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter', repeat: true });

        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
        expect(onHideChange).not.toHaveBeenCalled();
    });

    it('в управляемом режиме ожидает обновления hide от родителя', () => {
        const onHideChange = jest.fn();
        const { rerender } = render(
            <Spoiler hide onHideChange={onHideChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(onHideChange).toHaveBeenCalledWith(false);
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');

        rerender(
            <Spoiler hide={false} onHideChange={onHideChange}>
                Скрытый текст
            </Spoiler>,
        );

        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(screen.getByRole('button'));

        expect(onHideChange).toHaveBeenLastCalledWith(true);
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('фокус не раскрывает текст, но позволяет активировать его с клавиатуры', async () => {
        const user = userEvent.setup();
        render(<Spoiler>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');

        act(() => trigger.focus());
        fireEvent.mouseEnter(trigger);
        fireEvent.mouseLeave(trigger);

        expect(trigger).toHaveFocus();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        await user.keyboard('{Enter}');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        act(() => trigger.blur());

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it.each([
        ['text', 'element', false],
        ['text', 'element', true],
        ['element', 'text', false],
        ['element', 'text', true],
    ] as const)(
        'обновляет подсветку фокуса при смене %s → %s (фокус до смены: %s)',
        async (from, to, wasFocused) => {
            const user = userEvent.setup();
            const example = (mode: typeof from | typeof to) => (
                <>
                    <Spoiler mode={mode} dataTestId='spoiler'>
                        Скрытый текст
                    </Spoiler>
                    <button type='button'>Следующий элемент</button>
                </>
            );
            const { rerender } = render(example(from));
            const oldTrigger = screen.getByRole('button', { name: /Показать скрыт/ });

            if (wasFocused) {
                await user.tab();
                await user.keyboard('{Enter}');
                expect(oldTrigger).toHaveFocus();
                expect(screen.getByTestId('spoiler')).toHaveAttribute('data-focused', 'true');
            }

            rerender(example(to));
            const root = screen.getByTestId('spoiler');
            const trigger = screen.getByRole('button', {
                name: wasFocused ? 'Скрыть содержимое' : /Показать скрыт/,
            });

            expect(oldTrigger).not.toBeInTheDocument();
            expect(trigger).not.toHaveFocus();
            expect(root).toHaveAttribute('data-focused', 'false');
            expect(trigger.nextElementSibling).toHaveAttribute('data-spoiler-content');
            expect(trigger).toHaveAttribute('aria-expanded', String(wasFocused));

            await user.tab();
            expect(trigger).toHaveFocus();
            expect(root).toHaveAttribute('data-focused', 'true');

            await user.keyboard(' ');
            expect(trigger).toHaveAttribute('aria-expanded', String(!wasFocused));
            await user.keyboard('{Enter}');
            expect(trigger).toHaveAttribute('aria-expanded', String(wasFocused));

            await user.tab();
            expect(screen.getByRole('button', { name: 'Следующий элемент' })).toHaveFocus();
            expect(root).toHaveAttribute('data-focused', 'false');
        },
    );

    it('в режиме manual переключается только через hide', () => {
        const onHideChange = jest.fn();
        const { rerender } = render(
            <Spoiler revealOn='manual' hide onHideChange={onHideChange} dataTestId='spoiler'>
                Скрытый текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        fireEvent.click(root);
        fireEvent.keyDown(root, { key: 'Enter' });
        fireEvent.mouseEnter(root);
        fireEvent.focus(root);

        expect(root).not.toHaveAttribute('role');
        expect(root).not.toHaveAttribute('tabindex');
        expect(root).toHaveAttribute('data-state', 'hidden');
        expect(onHideChange).not.toHaveBeenCalled();

        rerender(
            <Spoiler revealOn='manual' hide={false} dataTestId='spoiler'>
                Скрытый текст
            </Spoiler>,
        );

        expect(root).toHaveAttribute('data-state', 'revealed');
    });

    it('позволяет отменить переключение в пользовательском обработчике клика', () => {
        const onHideChange = jest.fn();
        const onClick = jest.fn((event: React.MouseEvent<HTMLSpanElement>) =>
            event.preventDefault(),
        );

        render(
            <Spoiler onClick={onClick} onHideChange={onHideChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onHideChange).not.toHaveBeenCalled();
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('позволяет отменить переключение в пользовательском обработчике клавиатуры', async () => {
        const user = userEvent.setup();
        const onHideChange = jest.fn();
        const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLSpanElement>) =>
            event.preventDefault(),
        );

        render(
            <Spoiler onKeyDown={onKeyDown} onHideChange={onHideChange}>
                Скрытый текст
            </Spoiler>,
        );

        act(() => screen.getByRole('button').focus());
        await user.keyboard('{Enter}');

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onHideChange).not.toHaveBeenCalled();
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('не смешивает нативный hidden с состоянием раскрытия', () => {
        const { rerender } = render(
            <Spoiler hidden hide={false} dataTestId='spoiler'>
                Скрытый элемент
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        expect(root).toHaveAttribute('hidden');
        expect(root).toHaveAttribute('data-state', 'revealed');
        expect(root.querySelector('[data-spoiler-content]')).not.toHaveAttribute('aria-hidden');

        rerender(
            <Spoiler hide dataTestId='spoiler'>
                Скрытый элемент
            </Spoiler>,
        );

        expect(root).not.toHaveAttribute('hidden');
        expect(root).toHaveAttribute('data-state', 'hidden');
    });
});
