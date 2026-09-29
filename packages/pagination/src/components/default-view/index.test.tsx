import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DefaultView } from './index';

describe('DefaultView', () => {
    const mockOnPageChange = jest.fn();

    beforeEach(() => {
        mockOnPageChange.mockClear();
    });

    it('клики по всем страницам работают, когда страниц мало', () => {
        render(<DefaultView pagesCount={5} currentPageIndex={2} onPageChange={mockOnPageChange} />);

        for (let i = 1; i <= 5; i++) {
            expect(screen.getByText(i.toString())).toBeInTheDocument();
        }

        fireEvent.click(screen.getByText('4'));
        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('клик по активной странице не вызывает onPageChange', () => {
        render(
            <DefaultView pagesCount={10} currentPageIndex={3} onPageChange={mockOnPageChange} />,
        );

        const activePage = screen.getByText('4');
        fireEvent.click(activePage);
        expect(mockOnPageChange).not.toHaveBeenCalled();
    });

    it('клики по страницам работают при большом количестве страниц (с троеточиями)', () => {
        render(
            <DefaultView
                pagesCount={100}
                currentPageIndex={50}
                sidePadding={2}
                activePadding={1}
                onPageChange={mockOnPageChange}
            />,
        );

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('99')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();

        // Кликаем по 99 (индекс 98) — должно вызвать верный индекс
        fireEvent.click(screen.getByText('99'));
        expect(mockOnPageChange).toHaveBeenCalledWith(98);
    });

    it('троеточия не вызывают onPageChange', () => {
        render(
            <DefaultView
                pagesCount={100}
                currentPageIndex={50}
                sidePadding={2}
                activePadding={1}
                onPageChange={mockOnPageChange}
            />,
        );

        const dots = screen.getAllByText('...');
        expect(dots.length).toBeGreaterThan(0);
        fireEvent.click(dots[0]);
        expect(mockOnPageChange).not.toHaveBeenCalled();
    });
});
