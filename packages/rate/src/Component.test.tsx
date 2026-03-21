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

    it('should clear value on second click when allowClear', () => {
        const onChange = jest.fn();
        render(<Rate allowClear defaultValue={3} onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        fireEvent.click(items[2]);

        expect(onChange).toHaveBeenCalledWith(0);
    });

    it('should not clear value on second click when allowClear is false', () => {
        const onChange = jest.fn();
        render(<Rate allowClear={false} defaultValue={2} onChange={onChange} />);

        const items = screen.getAllByRole('radio');
        fireEvent.click(items[1]);

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
    });

    it('should support custom character as string', () => {
        render(<Rate character='🔥' defaultValue={3} />);
        const items = screen.getAllByRole('radio');
        expect(items[0]).toHaveTextContent('🔥');
    });

    it('should support custom character as React element', () => {
        render(<Rate character={<span>★</span>} defaultValue={3} />);
        const items = screen.getAllByRole('radio');
        expect(items[0]).toHaveTextContent('★');
    });

    it('should support tooltips', () => {
        const tooltips = ['bad', 'ok', 'good', 'great', 'perfect'];
        render(<Rate tooltips={tooltips} defaultValue={3} />);

        const items = screen.getAllByRole('radio');
        expect(items[0]).toHaveAttribute('title', 'bad');
        expect(items[4]).toHaveAttribute('title', 'perfect');
    });

    it('should support different sizes', () => {
        const { container: s } = render(<Rate size='s' />);
        const { container: m } = render(<Rate size='m' />);
        const { container: l } = render(<Rate size='l' />);

        expect(s.querySelector('[role="radiogroup"]')).toHaveClass('sizeS');
        expect(m.querySelector('[role="radiogroup"]')).toHaveClass('sizeM');
        expect(l.querySelector('[role="radiogroup"]')).toHaveClass('sizeL');
    });

    it('should support autoFocus', () => {
        render(<Rate autoFocus />);
        const rate = screen.getByRole('radiogroup');
        expect(rate).toBeInTheDocument();
    });
});
