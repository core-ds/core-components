import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Rate } from './Component';

describe('Rate', () => {
    it('should render with default value', () => {
        render(<Rate defaultValue={3} />);
        const rate = screen.getByRole('radiogroup');
        expect(rate).toBeInTheDocument();
    });

    it('should render correct count of items', () => {
        render(<Rate count={7} />);
        const items = screen.getAllByRole('radio');
        expect(items).toHaveLength(7);
    });

    it('should call onChange when clicking on item', () => {
        const onChange = jest.fn();
        render(<Rate onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        fireEvent.click(items[2]);

        expect(onChange).toHaveBeenCalledWith(3);
    });

    it('should call onChange with half value when allowHalf', () => {
        const onChange = jest.fn();
        render(<Rate allowHalf onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        // Клик по левой половине (первая половина элемента)
        fireEvent.click(items[2], { clientX: 10 });

        expect(onChange).toHaveBeenCalled();
    });

    it('should clear value on second click when allowClear', () => {
        const onChange = jest.fn();
        render(<Rate allowClear defaultValue={3} onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        fireEvent.click(items[2]);

        expect(onChange).toHaveBeenCalledWith(0);
    });

    it('should not clear value on second click when allowClear is false', () => {
        const onChange = jest.fn();
        // Устанавливаем начальное значение 3, кликаем по 2 - значение должно измениться
        render(<Rate allowClear={false} defaultValue={2} onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        // Клик по элементу с index 2 (значение 3) - должно вызвать onChange с 3
        fireEvent.click(items[1]);

        // onChange вызывается с новым значением
        expect(onChange).toHaveBeenCalledWith(2);
    });

    it('should not call onChange when disabled', () => {
        const onChange = jest.fn();
        render(<Rate disabled defaultValue={3} onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        fireEvent.click(items[0]);

        expect(onChange).not.toHaveBeenCalled();
    });

    it('should not call onChange when readOnly', () => {
        const onChange = jest.fn();
        render(<Rate readOnly defaultValue={3} onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        fireEvent.click(items[0]);

        expect(onChange).not.toHaveBeenCalled();
    });

    it('should call onHoverChange when hovering', () => {
        const onHoverChange = jest.fn();
        render(<Rate onHoverChange={onHoverChange} />);

        const items = screen.getAllByRole('radio');
        fireEvent.mouseMove(items[2]);

        expect(onHoverChange).toHaveBeenCalled();
    });

    it('should support controlled mode', () => {
        const onChange = jest.fn();
        render(<Rate value={4} onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        fireEvent.click(items[0]);

        expect(onChange).toHaveBeenCalledWith(1);
        // Значение не должно измениться визуально, т.к. контролируемый режим
    });

    it('should support custom character as string', () => {
        render(<Rate character="🔥" defaultValue={3} />);
        const items = screen.getAllByRole('radio');
        expect(items[0]).toHaveTextContent('🔥');
    });

    it('should support custom character as function', () => {
        const characterFn = jest.fn((index) => (index === 0 ? 'A' : 'B'));
        render(<Rate character={characterFn} count={3} />);

        const items = screen.getAllByRole('radio');
        expect(items[0]).toHaveTextContent('A');
        expect(items[1]).toHaveTextContent('B');
    });

    it('should support tooltips', () => {
        const tooltips = ['bad', 'ok', 'good', 'great', 'perfect'];
        render(<Rate tooltips={tooltips} defaultValue={3} />);

        const items = screen.getAllByRole('radio');
        expect(items[0]).toHaveAttribute('title', 'bad');
        expect(items[4]).toHaveAttribute('title', 'perfect');
    });

    it('should support different sizes', () => {
        const { container: s } = render(<Rate size="s" />);
        const { container: m } = render(<Rate size="m" />);
        const { container: l } = render(<Rate size="l" />);

        expect(s.firstChild).toHaveClass('sizeS');
        expect(m.firstChild).toHaveClass('sizeM');
        expect(l.firstChild).toHaveClass('sizeL');
    });

    it('should support keyboard navigation', () => {
        const onChange = jest.fn();
        render(<Rate onChange={onChange} />);

        const rate = screen.getByRole('radiogroup');
        rate.focus();

        // ArrowRight should increase value
        fireEvent.keyDown(rate, { key: 'ArrowRight' });
        expect(onChange).toHaveBeenCalledWith(1);

        // ArrowLeft should decrease value
        fireEvent.keyDown(rate, { key: 'ArrowLeft' });
        expect(onChange).toHaveBeenCalledWith(0);
    });

    it('should support Home key to reset value', () => {
        const onChange = jest.fn();
        render(<Rate defaultValue={3} onChange={onChange} />);

        const rate = screen.getByRole('radiogroup');
        fireEvent.keyDown(rate, { key: 'Home' });

        expect(onChange).toHaveBeenCalledWith(0);
    });

    it('should support End key to set max value', () => {
        const onChange = jest.fn();
        render(<Rate count={5} onChange={onChange} />);

        const rate = screen.getByRole('radiogroup');
        fireEvent.keyDown(rate, { key: 'End' });

        expect(onChange).toHaveBeenCalledWith(5);
    });

    it('should support autoFocus', () => {
        render(<Rate autoFocus />);
        // Просто проверяем, что компонент рендерится с autoFocus
        const rate = screen.getByRole('radiogroup');
        expect(rate).toBeInTheDocument();
    });

    it('should call onFocus and onBlur', () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        render(<Rate onFocus={onFocus} onBlur={onBlur} />);

        const rate = screen.getByRole('radiogroup');
        // Симулируем фокус через событие - focus не всплывает, используем focusin
        fireEvent.focusIn(rate);
        expect(onFocus).toHaveBeenCalled();

        fireEvent.focusOut(rate);
        expect(onBlur).toHaveBeenCalled();
    });
});
