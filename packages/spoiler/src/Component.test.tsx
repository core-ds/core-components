import React, { createRef } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

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

    it('использует блочную разметку и сохраняет изображение при раскрытии', () => {
        const ref = createRef<HTMLDivElement>();
        const { container } = render(
            <Spoiler mode='element' ref={ref}>
                <img src='/image.png' alt='Сад' width={240} height={144} />
            </Spoiler>,
        );
        const root = screen.getByRole('button', { name: 'Показать скрытое содержимое' });
        const content = container.querySelector('[data-spoiler-content]');
        const image = container.querySelector('img');

        expect(root.tagName).toBe('DIV');
        expect(content?.tagName).toBe('DIV');
        expect(content).toHaveAttribute('inert');
        expect(container.querySelector('canvas')?.parentElement).toBe(root);
        expect(ref.current).toBe(root);
        expect(root).toHaveClass('element');
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        fireEvent.click(root);
        expect(screen.getByRole('img', { name: 'Сад' })).toBe(image);
        expect(content).not.toHaveAttribute('inert');
        fireEvent.click(root);
        expect(container.querySelector('img')).toBe(image);
    });

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
            <Spoiler mode='element' revealed revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        rerender(
            <Spoiler mode='element' revealed={false} revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        rerender(
            <Spoiler mode='element' revealed revealOn='manual'>
                <Counter />
            </Spoiler>,
        );
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    });

    it('скрывает текст по умолчанию и предоставляет доступную кнопку раскрытия', () => {
        const { container } = render(<Spoiler>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button', { name: 'Показать скрытый текст' });
        const content = container.querySelector('[data-spoiler-content]');

        expect(trigger).toHaveAttribute('tabindex', '0');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(trigger).toHaveAttribute('data-state', 'hidden');
        expect(content).toHaveAttribute('aria-hidden', 'true');
        expect(content).toHaveTextContent('Скрытый текст');
        expect(container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
    });

    it('раскрывает текст по клику и скрывает повторным кликом', () => {
        const onRevealedChange = jest.fn();
        const { container } = render(
            <Spoiler onRevealedChange={onRevealedChange}>Скрытый текст</Spoiler>,
        );
        const trigger = screen.getByRole('button');
        const content = container.querySelector('[data-spoiler-content]');

        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(trigger).toHaveAttribute('data-state', 'revealed');
        expect(trigger).not.toHaveAttribute('aria-label');
        expect(content).not.toHaveAttribute('aria-hidden', 'true');
        expect(screen.getByRole('button', { name: 'Скрытый текст' })).toBe(trigger);
        expect(onRevealedChange).toHaveBeenLastCalledWith(true);

        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(content).toHaveAttribute('aria-hidden', 'true');
        expect(onRevealedChange).toHaveBeenLastCalledWith(false);
    });

    it.each(['Enter', ' '])('переключает скрытый текст клавишей %p', (key) => {
        const onRevealedChange = jest.fn();

        render(<Spoiler onRevealedChange={onRevealedChange}>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');

        fireEvent.keyDown(trigger, { key });

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(onRevealedChange).toHaveBeenLastCalledWith(true);

        fireEvent.keyDown(trigger, { key });

        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(onRevealedChange).toHaveBeenLastCalledWith(false);
    });

    it('с revealOnce раскрывается один раз и становится неинтерактивным', () => {
        const onClick = jest.fn();
        const onRevealedChange = jest.fn();

        render(
            <Spoiler
                revealOnce
                dataTestId='spoiler'
                onClick={onClick}
                onRevealedChange={onRevealedChange}
            >
                Скрытый текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        fireEvent.click(root);

        expect(onRevealedChange).toHaveBeenCalledTimes(1);
        expect(onRevealedChange).toHaveBeenCalledWith(true);
        expect(root).toHaveAttribute('data-state', 'revealed');
        expect(root).not.toHaveAttribute('role');
        expect(root).not.toHaveAttribute('aria-expanded');
        expect(root).toHaveAttribute('tabindex', '-1');
        expect(root).not.toHaveClass('interactive');

        fireEvent.click(root);

        expect(onClick).toHaveBeenCalledTimes(2);
        expect(onRevealedChange).toHaveBeenCalledTimes(1);
        expect(root).toHaveAttribute('data-state', 'revealed');
    });

    it.each(['Enter', ' '])('с revealOnce раскрывается клавишей %p только один раз', (key) => {
        const onKeyDown = jest.fn();
        const onRevealedChange = jest.fn();

        render(
            <Spoiler
                revealOnce
                dataTestId='spoiler'
                onKeyDown={onKeyDown}
                onRevealedChange={onRevealedChange}
            >
                Скрытый текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        fireEvent.keyDown(root, { key });
        fireEvent.keyDown(root, { key });

        expect(onKeyDown).toHaveBeenCalledTimes(2);
        expect(onRevealedChange).toHaveBeenCalledTimes(1);
        expect(onRevealedChange).toHaveBeenCalledWith(true);
        expect(root).toHaveAttribute('data-state', 'revealed');
    });

    it('в управляемом режиме revealOnce снова разрешает раскрытие после revealed=false', () => {
        const onRevealedChange = jest.fn();
        const { rerender } = render(
            <Spoiler revealOnce revealed={false} onRevealedChange={onRevealedChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));
        expect(onRevealedChange).toHaveBeenLastCalledWith(true);
        rerender(
            <Spoiler revealOnce revealed onRevealedChange={onRevealedChange}>
                Скрытый текст
            </Spoiler>,
        );
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        rerender(
            <Spoiler revealOnce revealed={false} onRevealedChange={onRevealedChange}>
                Скрытый текст
            </Spoiler>,
        );
        onRevealedChange.mockClear();

        fireEvent.click(screen.getByRole('button'));

        expect(onRevealedChange).toHaveBeenCalledWith(true);
    });

    it('revealOnce не влияет на ручной режим и defaultRevealed сразу неинтерактивен', () => {
        const { rerender } = render(
            <Spoiler revealOnce revealOn='manual' revealed={false} dataTestId='spoiler'>
                Скрытый текст
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        fireEvent.click(root);
        expect(root).toHaveAttribute('data-state', 'hidden');
        expect(root).not.toHaveAttribute('tabindex');

        rerender(
            <Spoiler key='revealed-once' revealOnce defaultRevealed dataTestId='spoiler-once'>
                Скрытый текст
            </Spoiler>,
        );
        const revealed = screen.getByTestId('spoiler-once');
        expect(revealed).toHaveAttribute('data-state', 'revealed');
        expect(revealed).not.toHaveAttribute('role');
        expect(revealed).toHaveAttribute('tabindex', '-1');
    });

    it('не скрывает раскрытый текст при выделении внутри спойлера', () => {
        const onRevealedChange = jest.fn();

        render(
            <Spoiler defaultRevealed dataTestId='spoiler' onRevealedChange={onRevealedChange}>
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
        expect(onRevealedChange).not.toHaveBeenCalled();
    });

    it('игнорирует клавиши, которые не активируют кнопку', () => {
        const onRevealedChange = jest.fn();

        render(<Spoiler onRevealedChange={onRevealedChange}>Скрытый текст</Spoiler>);

        fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });

        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
        expect(onRevealedChange).not.toHaveBeenCalled();
    });

    it('в управляемом режиме ожидает обновления revealed от родителя', () => {
        const onRevealedChange = jest.fn();
        const { rerender } = render(
            <Spoiler revealed={false} onRevealedChange={onRevealedChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(onRevealedChange).toHaveBeenCalledWith(true);
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');

        rerender(
            <Spoiler revealed={true} onRevealedChange={onRevealedChange}>
                Скрытый текст
            </Spoiler>,
        );

        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('поддерживает начальное раскрытое состояние без повторного монтирования содержимого', () => {
        render(
            <Spoiler defaultRevealed={true}>
                <strong>Важный текст</strong>
            </Spoiler>,
        );
        const trigger = screen.getByRole('button');
        const content = screen.getByText('Важный текст');

        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(trigger);
        fireEvent.click(trigger);

        expect(screen.getByText('Важный текст')).toBe(content);
        expect(content.tagName).toBe('STRONG');
    });

    it('не раскрывает текст при наведении', () => {
        render(<Spoiler>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');

        fireEvent.mouseEnter(trigger);

        expect(trigger).toHaveAttribute('aria-expanded', 'false');

        fireEvent.mouseLeave(trigger);

        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('фокус не раскрывает текст, но позволяет активировать его с клавиатуры', () => {
        render(<Spoiler>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');

        act(() => trigger.focus());
        fireEvent.mouseEnter(trigger);
        fireEvent.mouseLeave(trigger);

        expect(trigger).toHaveFocus();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        fireEvent.keyDown(trigger, { key: 'Enter' });
        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        act(() => trigger.blur());

        expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('в режиме manual переключается только через revealed', () => {
        const onRevealedChange = jest.fn();
        const { rerender } = render(
            <Spoiler
                revealOn='manual'
                revealed={false}
                onRevealedChange={onRevealedChange}
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
        expect(onRevealedChange).not.toHaveBeenCalled();

        rerender(
            <Spoiler revealOn='manual' revealed={true} dataTestId='spoiler'>
                Скрытый текст
            </Spoiler>,
        );

        expect(root).toHaveAttribute('data-state', 'revealed');
    });

    it('позволяет отменить переключение в пользовательском обработчике клика', () => {
        const onRevealedChange = jest.fn();
        const onClick = jest.fn((event: React.MouseEvent<HTMLSpanElement>) =>
            event.preventDefault(),
        );

        render(
            <Spoiler onClick={onClick} onRevealedChange={onRevealedChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onRevealedChange).not.toHaveBeenCalled();
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('позволяет отменить переключение в пользовательском обработчике клавиатуры', () => {
        const onRevealedChange = jest.fn();
        const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLSpanElement>) =>
            event.preventDefault(),
        );

        render(
            <Spoiler onKeyDown={onKeyDown} onRevealedChange={onRevealedChange}>
                Скрытый текст
            </Spoiler>,
        );

        fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onRevealedChange).not.toHaveBeenCalled();
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('сохраняет скрытое содержимое и запасное оформление, когда canvas недоступен', () => {
        const { container } = render(<Spoiler>Скрытый текст</Spoiler>);
        const trigger = screen.getByRole('button');

        expect(trigger).toHaveClass('hidden');
        expect(trigger).not.toHaveClass('ready');
        expect(container.querySelector('[data-spoiler-content]')).toHaveAttribute(
            'aria-hidden',
            'true',
        );

        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute('data-state', 'revealed');
        expect(container.querySelector('[data-spoiler-content]')).not.toHaveAttribute(
            'aria-hidden',
            'true',
        );
    });

    it('не смешивает нативный hidden с состоянием раскрытия', () => {
        const { rerender } = render(
            <Spoiler hidden revealed dataTestId='spoiler'>
                Скрытый элемент
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        expect(root).toHaveAttribute('hidden');
        expect(root).toHaveAttribute('data-state', 'revealed');
        expect(root.querySelector('[data-spoiler-content]')).not.toHaveAttribute('aria-hidden');

        rerender(
            <Spoiler revealed={false} dataTestId='spoiler'>
                Скрытый элемент
            </Spoiler>,
        );

        expect(root).not.toHaveAttribute('hidden');
        expect(root).toHaveAttribute('data-state', 'hidden');
    });

    it('передаёт ref и общие атрибуты корневому элементу', () => {
        const ref = createRef<HTMLSpanElement>();

        render(
            <Spoiler
                ref={ref}
                dataTestId='spoiler'
                className='custom-spoiler'
                style={{ color: 'red' }}
                title='Подсказка'
                aria-label='Показать сумму'
            >
                125 600 ₽
            </Spoiler>,
        );
        const root = screen.getByTestId('spoiler');

        expect(ref.current).toBe(root);
        expect(root).toHaveClass('custom-spoiler');
        expect(root).toHaveStyle({ color: 'rgb(255, 0, 0)' });
        expect(root).toHaveAttribute('title', 'Подсказка');
        expect(screen.getByRole('button', { name: 'Показать сумму' })).toBe(root);
    });
});
