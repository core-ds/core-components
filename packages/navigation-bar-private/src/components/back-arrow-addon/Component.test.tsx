import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BackArrowAddon, BackArrowAddonProps } from './Component';

describe('BackArrowAddon', () => {
    const renderComponent = (props: Partial<BackArrowAddonProps> = {}) => {
        return render(<BackArrowAddon view='desktop' {...props} />);
    };

    it('should render default text', () => {
        const { getByText } = renderComponent();
        expect(getByText('Назад')).toBeInTheDocument();
    });

    it('should not render text when text is null', () => {
        const { queryByText } = renderComponent({ text: null });
        expect(queryByText('Назад')).not.toBeInTheDocument();
    });

    it('should set custom class', () => {
        const { container } = renderComponent({
            view: 'mobile',
            iconWrapperClassName: 'custom-wrapper',
        });
        const wrapper = container.querySelector('svg')?.parentElement;

        expect(wrapper).toHaveClass('custom-wrapper');
    });

    it('should call onClick when clicked', () => {
        const handleClick = jest.fn();
        const { getByRole } = renderComponent({ onClick: handleClick });

        fireEvent.click(getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
    });
});
