import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { PickerButton } from './index';
import { PickerButtonDesktop } from './Component';
import { PickerButtonMobile } from './Component.mobile';

const testId = 'picker-button-test-id';
const className = 'pickerButtonClassName';
const label = 'some label';
const options = [
    { key: '1', content: 'Neptunium' },
    { key: '2', content: 'Plutonium' },
    { key: '3', content: 'Americium' },
    { key: '4', content: 'Curium' },
    { key: '5', content: 'Berkelium' },
    { key: '6', content: 'Californium' },
    { key: '7', content: 'Einsteinium' },
    { key: '8', content: 'Fermium' },
    { key: '9', content: 'Mendelevium' },
    { key: '10', content: 'Nobelium' },
    { key: '11', content: 'Lawrencium' },
    { key: '12', content: 'Rutherfordium' },
    { key: '13', content: 'Dubnium' },
    { key: '14', content: 'Seaborgium' },
    { key: '15', content: 'Bohrium' },
];

const pickerButtonVariants = [PickerButton, PickerButtonDesktop, PickerButtonMobile];

const clickPickerButton = () => {
    const button = document.querySelector('button') as HTMLButtonElement;
    fireEvent.click(button);
};

describe.each(pickerButtonVariants)('Snapshots tests', (Component) => {
    it('should display correctly', () => {
        const { container } = render(<Component label={label} options={options} />);

        expect(container).toMatchSnapshot();
    });

    it('should display opened correctly', async () => {
        const { container, baseElement, queryByRole } = render(<PickerButton options={options} />);

        clickPickerButton();

        await waitFor(() => {
            expect(queryByRole('combobox')).toBeInTheDocument();
        });

        expect(container).toMatchSnapshot();
        expect(baseElement.firstElementChild).toMatchSnapshot();
    });
});

describe('Attributes tests', () => {
    it.each(pickerButtonVariants)('should set data-test-id attribute', async (Component) => {
        render(<Component className={className} dataTestId={testId} options={options} />);

        const container = document.querySelector(`.${className}`);

        const testIdAttr = container?.getAttribute('data-test-id');

        expect(testIdAttr).toBe(testId);
    });

    it.each(pickerButtonVariants)('should have disabled attribute', async (Component) => {
        render(<Component disabled={true} options={options} />);

        const button = document.querySelector('button');

        expect(button).toHaveAttribute('disabled');
    });
});

describe('Render tests', () => {
    it.each(pickerButtonVariants)('should unmount without errors', async (Component) => {
        const { unmount } = render(<Component options={options} />);

        expect(unmount).not.toThrowError();
    });

    it.each(pickerButtonVariants)('should have loading class', async (Component) => {
        render(<Component options={options} loading={true} />);
        const button = document.querySelector('button');

        expect(button).toHaveClass('loading');
    });

    it.each(pickerButtonVariants)('should have primary class', async (Component) => {
        const view = 'primary';
        render(<Component options={options} view={view} />);
        const button = document.querySelector('button');

        expect(button).toHaveClass(view);
    });

    it.each(pickerButtonVariants)(
        'should have m class, icon size = 24, secondary class by default',
        async (Component) => {
            const iconSize = '24';
            const { getByTestId } = render(<Component options={options} />);
            const button = document.querySelector('button');
            const icon = getByTestId('picker-button-icon');

            expect(button).toHaveClass('m');
            expect(button).toHaveClass('secondary');
            expect(icon.getAttribute('width')).toBe(iconSize);
            expect(icon.getAttribute('height')).toBe(iconSize);
        },
    );

    it.each(pickerButtonVariants)('should have xxs class and small icon', async (Component) => {
        const size = 'xxs';
        const iconSize = '16';

        const { getByTestId } = render(<Component options={options} size={size} />);
        const button = document.querySelector('button');
        const icon = getByTestId('picker-button-icon');

        expect(button).toHaveClass(size);
        expect(icon.getAttribute('width')).toBe(iconSize);
        expect(icon.getAttribute('height')).toBe(iconSize);
    });

    it.each(pickerButtonVariants)('should have open class if opened', async (Component) => {
        render(<Component label={label} options={options} />);

        clickPickerButton();

        await waitFor(() => {
            const iconContainer = document.querySelector('.iconContainer');
            expect(iconContainer).toHaveClass('open');
        });
    });

    it.each(pickerButtonVariants)('should have options if opened', async (Component) => {
        render(<Component label={label} options={options} />);

        clickPickerButton();

        await waitFor(() => {
            const renderedOptions = document.querySelectorAll('.option');
            expect(renderedOptions).toHaveLength(options.length);
        });
    });

    it.each(pickerButtonVariants)(
        'options container should have sideGap & optionsPopover  class',
        async (Component) => {
            const { container } = render(
                <Component options={options} loading={true} popoverPosition='right' />,
            );
            expect(container.getElementsByClassName('optionsPopover')).not.toBeNull();
            expect(container.getElementsByClassName('sideGap')).not.toBeNull();
        },
    );
});
