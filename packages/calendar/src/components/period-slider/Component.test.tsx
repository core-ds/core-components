import React from 'react';
import { render, screen } from '@testing-library/react';
import { PeriodSlider } from './Component';

describe('PeriodSlider', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    describe('empty PeriodSlider', () => {
        it('empty PeriodSlider has default title', () => {
            render(<PeriodSlider periodType='day' />);
            const defaultTitle = screen.queryByText('Укажите период');
            expect(defaultTitle).toBeInTheDocument();
        });

        it('empty PeriodSlider has specific title', () => {
            render(<PeriodSlider periodType='day' emptyValueText='Не выбрано' />);
            const specificTitle = screen.queryByText('Не выбрано');
            expect(specificTitle).toBeInTheDocument();
        });

        it('empty PeriodSlider default title snapshot', () => {
            const { container } = render(<PeriodSlider periodType='day' />);
            expect(container).toMatchSnapshot();
        });

        it('empty PeriodSlider specific title snapshot', () => {
            const { container } = render(
                <PeriodSlider periodType='day' emptyValueText='Не выбрано' />,
            );
            expect(container).toMatchSnapshot();
        });
    });
});
