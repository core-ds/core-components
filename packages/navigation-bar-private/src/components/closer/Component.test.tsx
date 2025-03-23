import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Closer, CloserProps } from './Component';

describe('Closer', () => {
    const defaultProps: CloserProps = {
        view: 'mobile',
        onClose: jest.fn(),
        style: { zIndex: 10, color: 'blue' },
    };

    const renderComponent = (props: Partial<CloserProps> = {}) => {
        return render(<Closer {...defaultProps} {...props} />);
    };

    beforeAll(() => {
        global.window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));
    });

    it('should render correctly', () => {
        const { container } = renderComponent();
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should have base style to inline', () => {
        const { getByRole } = renderComponent();
        const button = getByRole('button');

        expect(button).toHaveStyle({ zIndex: 10, color: 'blue' });
    });

    it('should call onClose with "closerClick" reason when clicked', () => {
        const handleClose = jest.fn();
        const { getByRole } = renderComponent({ onClose: handleClose });
        const button = getByRole('button');

        fireEvent.click(button);
        expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'closerClick');
    });
});
