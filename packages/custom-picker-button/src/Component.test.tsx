import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { CustomPickerButton } from './index';
import { CustomPickerButtonDesktop } from './desktop';
import { CustomPickerButtonMobile } from './mobile';

const testId = 'custom-picker-button-test-id';
const className = 'customPickerButtonClassName';
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

const customPickerButtonVariants = [
    CustomPickerButton,
    CustomPickerButtonDesktop,
    CustomPickerButtonMobile,
];

const clickCustomPickerButton = () => {
    const button = document.querySelector('button') as HTMLButtonElement;
    fireEvent.click(button);
};

describe.each(customPickerButtonVariants)('Snapshots tests', (Component) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    it('should display correctly', () => {
        const { container } = render(<Component label={label} options={options} />);

        expect(container).toMatchSnapshot();
    });

    it('should render custom background color', () => {
        expect(
            render(<Component label={label} options={options} backgroundColor='#00ff00' />),
        ).toMatchSnapshot();
    });

    it('should render black color content', () => {
        expect(
            render(<Component label={label} options={options} contentColor='black' />),
        ).toMatchSnapshot();
    });

    it('should display opened correctly', async () => {
        const { container, baseElement, queryByRole } = render(
            <CustomPickerButton options={options} />,
        );

        clickCustomPickerButton();

        await waitFor(() => {
            expect(queryByRole('combobox')).toBeInTheDocument();
        });

        expect(container).toMatchSnapshot();
        expect(baseElement.firstElementChild).toMatchSnapshot();
    });
});

describe('Attributes tests', () => {
    it.each(customPickerButtonVariants)('should set data-test-id attribute', async (Component) => {
        render(<Component className={className} dataTestId={testId} options={options} />);

        const container = document.querySelector(`.${className}`);

        const testIdAttr = container?.getAttribute('data-test-id');

        expect(testIdAttr).toBe(testId);
    });

    it.each(customPickerButtonVariants)('should have disabled attribute', async (Component) => {
        render(<Component disabled={true} options={options} />);

        const button = document.querySelector('button');

        expect(button).toHaveAttribute('disabled');
    });

    it.each(customPickerButtonVariants)('should have `style` attribute', async (Component) => {
        render(<Component options={options} />);

        const button = document.querySelector('button');

        expect(button).toHaveAttribute('style');
    });

    it.each(customPickerButtonVariants)('should have `style background`', async (Component) => {
        const bgcolor = 'rgb(255, 69, 195)';
        render(<Component options={options} backgroundColor={bgcolor} />);
        const button = document.querySelector('button');

        expect(button).toHaveStyle({ background: bgcolor });
    });
});

describe('Render tests', () => {
    it.each(customPickerButtonVariants)('should unmount without errors', async (Component) => {
        const { unmount } = render(<Component options={options} />);

        expect(unmount).not.toThrow();
    });

    it.each(customPickerButtonVariants)('should have loading class', async (Component) => {
        render(<Component options={options} loading={true} />);
        const button = document.querySelector('button');

        expect(button).toHaveClass('loading');
    });

    it.each(customPickerButtonVariants)(
        'should have 56 class, icon size = 24, primary class by default',
        async (Component) => {
            const iconSize = '24';
            const { getByTestId } = render(<Component options={options} />);
            const button = document.querySelector('button');
            const icon = getByTestId('custom-picker-button-icon');

            expect(button).toHaveClass('size-56');
            expect(button).toHaveClass('primary');
            expect(icon.getAttribute('width')).toBe(iconSize);
            expect(icon.getAttribute('height')).toBe(iconSize);
        },
    );

    it.each(customPickerButtonVariants)(
        'should have xxs class and small icon',
        async (Component) => {
            const size = 32;
            const iconSize = '16';

            const { getByTestId } = render(<Component options={options} size={size} />);
            const button = document.querySelector('button');
            const icon = getByTestId('custom-picker-button-icon');

            expect(button).toHaveClass(`size-${size}`);
            expect(icon.getAttribute('width')).toBe(iconSize);
            expect(icon.getAttribute('height')).toBe(iconSize);
        },
    );

    it.each(customPickerButtonVariants)('should have open class if opened', async (Component) => {
        render(<Component label={label} options={options} />);

        clickCustomPickerButton();

        await waitFor(() => {
            const iconContainer = document.querySelector('.iconContainer');
            expect(iconContainer).toHaveClass('open');
        });
    });

    it.each(customPickerButtonVariants)('should have options if opened', async (Component) => {
        render(<Component label={label} options={options} />);

        clickCustomPickerButton();

        await waitFor(() => {
            const renderedOptions = document.querySelectorAll('.option');
            expect(renderedOptions).toHaveLength(options.length);
        });
    });

    it.each(customPickerButtonVariants)(
        'options container should have sideGap & optionsPopover  class',
        async (Component) => {
            const { container } = render(
                <Component options={options} loading={true} popoverPosition='right' />,
            );
            expect(container.getElementsByClassName('optionsPopover')).not.toBeNull();
            expect(container.getElementsByClassName('sideGap')).not.toBeNull();
        },
    );

    it.each(customPickerButtonVariants)('options group should have label', async (Component) => {
        render(<Component options={[{ label: 'Валютный счёт', options }]} />);

        clickCustomPickerButton();

        await waitFor(() => {
            const renderedGroup = document.querySelector('.optgroup');

            expect(renderedGroup).not.toBeNull();
            expect(renderedGroup).toHaveTextContent('Валютный счёт');
        });
    });

    it.each(customPickerButtonVariants)(
        'should`t render arrow if showArrow = false',
        (Component) => {
            const { container } = render(
                <Component showArrow={false} options={[{ label: 'Валютный счёт', options }]} />,
            );

            expect(container.querySelector('[data-test-id=custom-picker-button-icon]')).toBeNull();
        },
    );

    it.each(customPickerButtonVariants)(
        'should render icon if variant = compact & showArrow = false ',
        (Component) => {
            const { getByTestId } = render(
                <Component
                    showArrow={false}
                    variant='compact'
                    options={[{ label: 'Валютный счёт', options }]}
                />,
            );
            const icon = getByTestId('custom-picker-button-icon');

            expect(icon).toBeInTheDocument();
        },
    );
});
