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
            <Spoiler mode='element' open revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        rerender(
            <Spoiler mode='element' open={false} revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        rerender(
            <Spoiler mode='element' open revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    });

    it('раскрывает текст по клику и скрывает повторным кликом', () => {
        const onOpenChange = jest.fn();
        const { container } = render(<Spoiler onOpenChange={onOpenChange}>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');
        const content = container.querySelector('[data-spoiler-content]');

        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(trigger.closest('[data-state]')).toHaveAttribute('data-state', 'revealed');
        expect(content).not.toHaveAttribute('aria-hidden', 'true');
        expect(screen.getByRole('button', { name: 'Скрыть содержимое' })).toBe(trigger);
        expect(trigger).toHaveAttribute('aria-controls', content!.id);
        expect(trigger).not.toContainElement(content as HTMLElement);
        expect(onOpenChange).toHaveBeenLastCalledWith(true);

        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(content).toHaveAttribute('aria-hidden', 'true');
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });

    it.each(['{Enter}', ' '])('переключает скрытый текст клавишей %p', async (key) => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        render(<Spoiler onOpenChange={onOpenChange}>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');

        await user.tab();
        await user.keyboard(key);

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(onOpenChange).toHaveBeenLastCalledWith(true);

        await user.keyboard(key);

        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });

    it('с revealOnce раскрывается один раз и становится неинтерактивным', () => {
        const onClick = jest.fn();
        const onOpenChange = jest.fn();

        render(
            <Spoiler revealOnce dataTestId='spoiler' onClick={onClick} onOpenChange={onOpenChange}>
                Скрытый текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        fireEvent.click(root);

        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(root).toHaveAttribute('data-state', 'revealed');
        expect(root).not.toHaveAttribute('role');
        expect(root).not.toHaveAttribute('aria-expanded');
        expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(root);

        expect(onClick).toHaveBeenCalledTimes(2);
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(root).toHaveAttribute('data-state', 'revealed');
    });

    it.each(['{Enter}', ' '])(
        'с revealOnce раскрывается клавишей %p только один раз',
        async (key) => {
            const user = userEvent.setup();
            const onKeyDown = jest.fn();
            const onOpenChange = jest.fn();

            render(
                <Spoiler
                    revealOnce
                    dataTestId='spoiler'
                    onKeyDown={onKeyDown}
                    onOpenChange={onOpenChange}
                >
                    Скрытый текст
                </Spoiler>,
            );
            const root = screen.getByTestId('spoiler');

            act(() => screen.getByRole('button').focus());
            await user.keyboard(key);
            await user.keyboard(key);

            expect(onKeyDown).toHaveBeenCalledTimes(2);
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(onOpenChange).toHaveBeenCalledWith(true);
            expect(root).toHaveAttribute('data-state', 'revealed');
        },
    );

    it('в управляемом режиме revealOnce снова разрешает раскрытие после open=false', () => {
        const onOpenChange = jest.fn();
        const { rerender } = render(
            <Spoiler revealOnce open={false} onOpenChange={onOpenChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));
        expect(onOpenChange).toHaveBeenLastCalledWith(true);
        rerender(
            <Spoiler revealOnce open onOpenChange={onOpenChange}>
                Скрытый текст
            </Spoiler>,
        );
        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
        rerender(
            <Spoiler revealOnce open={false} onOpenChange={onOpenChange}>
                Скрытый текст
            </Spoiler>,
        );
        onOpenChange.mockClear();

        fireEvent.click(screen.getByRole('button'));

        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('revealOnce не влияет на ручной режим и defaultOpen сразу неинтерактивен', () => {
        const { rerender } = render(
            <Spoiler revealOnce revealOn='manual' open={false} dataTestId='spoiler'>
                Скрытый текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        fireEvent.click(root);
        expect(root).toHaveAttribute('data-state', 'hidden');
        expect(root).not.toHaveAttribute('tabindex');

        rerender(
            <Spoiler key='revealed-once' revealOnce defaultOpen dataTestId='spoiler-once'>
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
        const onOpenChange = jest.fn();

        render(
            <Spoiler defaultOpen dataTestId='spoiler' onOpenChange={onOpenChange}>
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
        expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('игнорирует клавиши, которые не активируют кнопку', () => {
        const onOpenChange = jest.fn();

        render(<Spoiler onOpenChange={onOpenChange}>Скрытый текст</Spoiler>);

        fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });
        fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter', repeat: true });

        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
        expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('в управляемом режиме ожидает обновления open от родителя', () => {
        const onOpenChange = jest.fn();
        const { rerender } = render(
            <Spoiler open={false} onOpenChange={onOpenChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');

        rerender(
            <Spoiler open={true} onOpenChange={onOpenChange}>
                Скрытый текст
            </Spoiler>,
        );

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

    it('в режиме manual переключается только через open', () => {
        const onOpenChange = jest.fn();
        const { rerender } = render(
            <Spoiler
                revealOn='manual'
                open={false}
                onOpenChange={onOpenChange}
                dataTestId='spoiler'
            >
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
        expect(onOpenChange).not.toHaveBeenCalled();

        rerender(
            <Spoiler revealOn='manual' open={true} dataTestId='spoiler'>
                Скрытый текст
            </Spoiler>,
        );

        expect(root).toHaveAttribute('data-state', 'revealed');
    });

    it('позволяет отменить переключение в пользовательском обработчике клика', () => {
        const onOpenChange = jest.fn();
        const onClick = jest.fn((event: React.MouseEvent<HTMLSpanElement>) =>
            event.preventDefault(),
        );

        render(
            <Spoiler onClick={onClick} onOpenChange={onOpenChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('позволяет отменить переключение в пользовательском обработчике клавиатуры', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLSpanElement>) =>
            event.preventDefault(),
        );

        render(
            <Spoiler onKeyDown={onKeyDown} onOpenChange={onOpenChange}>
                Скрытый текст
            </Spoiler>,
        );

        act(() => screen.getByRole('button').focus());
        await user.keyboard('{Enter}');

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('не смешивает нативный hidden с состоянием раскрытия', () => {
        const { rerender } = render(
            <Spoiler hidden open dataTestId='spoiler'>
                Скрытый элемент
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        expect(root).toHaveAttribute('hidden');
        expect(root).toHaveAttribute('data-state', 'revealed');
        expect(root.querySelector('[data-spoiler-content]')).not.toHaveAttribute('aria-hidden');

        rerender(
            <Spoiler open={false} dataTestId='spoiler'>
                Скрытый элемент
            </Spoiler>,
        );

        expect(root).not.toHaveAttribute('hidden');
        expect(root).toHaveAttribute('data-state', 'hidden');
    });
});
