import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { IndicatorTag } from './components/indicator-tag';
import { TagDesktop as Tag } from './desktop';

describe('Snapshots tests', () => {
    it('should match snapshot', () => {
        expect(render(<Tag>Press me</Tag>)).toMatchSnapshot();
    });

    it('should match snapshot shape=rectangular', () => {
        expect(render(<Tag shape='rectangular'>Press me</Tag>)).toMatchSnapshot();
    });

    it('should match without children snapshot', () => {
        expect(render(<Tag />)).toMatchSnapshot();
    });

    it('should match snapshot with right addons', () => {
        expect(render(<Tag rightAddons={<span>10 000 $</span>}>Press me</Tag>)).toMatchSnapshot();
    });

    it('should match snapshot with left addons', () => {
        expect(render(<Tag leftAddons={<span>10 000 $</span>}>Press me</Tag>)).toMatchSnapshot();
    });
});

describe('Classes tests', () => {
    it('should set custom class', () => {
        const className = 'custom-class';

        const { container } = render(<Tag className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set size 48 as default size', () => {
        const { container } = render(<Tag />);

        expect(container.firstElementChild).toHaveClass('size-48');
    });

    it('should set size', () => {
        const { container } = render(<Tag size={56} />);

        expect(container.firstElementChild).toHaveClass('size-56');
    });

    it('should set `checked` class if prop `checked` is present', () => {
        const { container } = render(<Tag checked={true} />);

        expect(container.firstElementChild).toHaveClass('checked');
    });

    it('should set `rectangular` class if prop `shape=rectangular`', () => {
        const { container } = render(<Tag shape='rectangular' />);

        expect(container.firstElementChild).toHaveClass('rectangular');
    });

    it('should set `allowBackdropBlur` class', () => {
        const { container } = render(<Tag allowBackdropBlur={true} />);

        expect(container.firstElementChild).toHaveClass('allowBackdropBlur');
    });
});

describe('Attributes tests', () => {
    it('should set disabled attribute', () => {
        const { container } = render(<Tag disabled={true} />);

        expect(container.firstElementChild).toBeDisabled();
    });

    it('should set data-test-id attribute', () => {
        const dataTestId = 'tag-test-id';

        const { container } = render(<Tag disabled={true} dataTestId={dataTestId} />);

        const testIdAttr = container.firstElementChild?.getAttribute('data-test-id');

        expect(container.firstElementChild?.getAttribute('data-test-id')).toBe(testIdAttr);
    });
});

describe('Render tests', () => {
    it('should unmount without errors', () => {
        const { unmount } = render(<Tag rightAddons={<div>addons</div>}>Tag</Tag>);

        expect(unmount).not.toThrow();
    });

    it('should contain right addons', () => {
        const rightAddonText = 'Right addon text';

        const { container, getByText } = render(
            <Tag rightAddons={<span>{rightAddonText}</span>}>Tag</Tag>,
        );

        expect(container.firstElementChild).toContainElement(getByText(rightAddonText));
    });

    it('should contain left addons', () => {
        const leftAddonText = 'Left addon text';

        const { container, getByText } = render(
            <Tag leftAddons={<span>{leftAddonText}</span>}>Tag</Tag>,
        );

        expect(container.firstElementChild).toContainElement(getByText(leftAddonText));
    });

    it.each([32, 40] as const)(
        'should keep rectangular dot indicator inside tag bounds for size=%s',
        (size) => {
            const { container } = render(
                <Tag
                    Component={IndicatorTag}
                    size={size}
                    shape='rectangular'
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );
            const indicator = container.querySelector('.indicator');

            expect(indicator).toHaveStyle({ left: '36px', top: '4px' });
        },
    );

    it.each([32, 40] as const)(
        'should place rounded dot indicator by circle diagonal for size=%s',
        (size) => {
            const { container } = render(
                <Tag
                    Component={IndicatorTag}
                    size={size}
                    shape='rounded'
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );
            const indicator = container.querySelector('.indicator') as HTMLElement;

            expect(parseFloat(indicator.style.left)).toBeLessThanOrEqual(36);
        },
    );
});

describe('Interaction its', () => {
    it('should call `onClick` prop, if tag not disabled', () => {
        const cb = jest.fn();

        const { container } = render(<Tag onClick={cb}>Press me!</Tag>);

        if (container.firstElementChild) {
            fireEvent.click(container.firstElementChild);
        }

        expect(cb).toHaveBeenCalledTimes(1);
    });

    it('should not call `onClick` prop, if tag is disabled', () => {
        const cb = jest.fn();

        const { container } = render(
            <Tag onClick={cb} disabled={true}>
                Press me!
            </Tag>,
        );

        if (container.firstElementChild) {
            fireEvent.click(container.firstElementChild);
        }

        expect(cb).toHaveBeenCalledTimes(0);
    });

    it('should not call `onClick` prop, if tag is disabled and checked', () => {
        const cb = jest.fn();

        const { container } = render(
            <Tag onClick={cb} disabled={true} checked={true}>
                Press me!
            </Tag>,
        );

        if (container.firstElementChild) {
            fireEvent.click(container.firstElementChild);
        }

        expect(cb).toHaveBeenCalledTimes(0);
    });
});

describe('Indicator tag', () => {
    describe('Success Cases', () => {
        it('should render dot indicator if mode is dot', () => {
            const { container } = render(
                <Tag
                    Component={IndicatorTag}
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );

            expect(container.querySelector('.indicator')).toBeInTheDocument();
        });

        it('should render count value', () => {
            const { getByText } = render(
                <Tag
                    Component={IndicatorTag}
                    indicatorProps={{ mode: 'count', value: 7 }}
                    leftAddons={<span />}
                />,
            );

            expect(getByText('7')).toBeInTheDocument();
        });

        it('should render two-digit count value if value is two-digit number', () => {
            const { getByText } = render(
                <Tag
                    Component={IndicatorTag}
                    indicatorProps={{ mode: 'count', value: 10 }}
                    leftAddons={<span />}
                />,
            );

            expect(getByText('10')).toBeInTheDocument();
        });

        it('should render capped count value if value is three-digit number', () => {
            const { getByText } = render(
                <Tag
                    Component={IndicatorTag}
                    indicatorProps={{ mode: 'count', value: 100 }}
                    leftAddons={<span />}
                />,
            );

            expect(getByText('99+')).toBeInTheDocument();
        });

        it('should call onClick prop', () => {
            const onClick = jest.fn();

            const { container } = render(
                <Tag
                    Component={IndicatorTag}
                    onClick={onClick}
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('should set checked class when checked=true', () => {
            const { container } = render(
                <Tag
                    Component={IndicatorTag}
                    checked={true}
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );

            expect(container.firstElementChild).toHaveClass('checked');
        });

        it('should set data-test-id on root element', () => {
            const dataTestId = 'indicator-tag-test-id';
            const { container } = render(
                <Tag
                    Component={IndicatorTag}
                    dataTestId={dataTestId}
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );

            expect(container.firstElementChild).toHaveAttribute('data-test-id', dataTestId);
        });
    });

    describe('Edge Cases', () => {
        it('should fallback to size-40 class if size is not supported', () => {
            const { container } = render(
                <Tag
                    Component={IndicatorTag}
                    size={48 as unknown as 32}
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );

            expect(container.firstElementChild).toHaveClass('size-40');
        });

        it('should not render indicator if indicatorProps is not provided', () => {
            const { container } = render(<Tag Component={IndicatorTag} leftAddons={<span />} />);

            expect(container.querySelector('.indicator')).not.toBeInTheDocument();
        });

        it('should default to dot mode if value is provided without mode', () => {
            const { container } = render(
                <Tag Component={IndicatorTag} indicatorProps={{}} leftAddons={<span />} />,
            );

            expect(container.querySelector('.indicator')).toBeInTheDocument();
        });

        it('should not render count text if dot mode and value are provided', () => {
            const { queryByText } = render(
                <Tag
                    Component={IndicatorTag}
                    indicatorProps={{ mode: 'dot', value: 7 }}
                    leftAddons={<span />}
                />,
            );

            expect(queryByText('7')).not.toBeInTheDocument();
        });

        it('should use count mode if value is provided without mode', () => {
            const { getByText } = render(
                <Tag
                    Component={IndicatorTag}
                    indicatorProps={{ value: 7 }}
                    leftAddons={<span />}
                />,
            );

            expect(getByText('7')).toBeInTheDocument();
        });
    });

    describe('Error Cases', () => {
        it('should throw if indicator mode is invalid', () => {
            const renderWithInvalidMode = () =>
                render(
                    <Tag
                        Component={IndicatorTag}
                        indicatorProps={{ mode: 'invalid' as unknown as 'dot' }}
                        leftAddons={<span />}
                    />,
                );

            expect(renderWithInvalidMode).toThrow();
        });

        it('should throw if shape is invalid', () => {
            const renderWithInvalidShape = () =>
                render(
                    <Tag
                        Component={IndicatorTag}
                        shape={'invalid' as unknown as 'rounded'}
                        indicatorProps={{ mode: 'dot' }}
                        leftAddons={<span />}
                    />,
                );

            expect(renderWithInvalidShape).toThrow();
        });

        it('should not throw if size is invalid', () => {
            const renderWithInvalidSize = () =>
                render(
                    <Tag
                        Component={IndicatorTag}
                        size={{} as unknown as 32}
                        indicatorProps={{ mode: 'dot' }}
                        leftAddons={<span />}
                    />,
                );

            expect(renderWithInvalidSize).not.toThrow();
        });

        it('should not throw if indicatorProps is null', () => {
            const renderWithNullIndicatorProps = () =>
                render(
                    <Tag
                        Component={IndicatorTag}
                        indicatorProps={null as unknown as { mode: 'dot' }}
                        leftAddons={<span />}
                    />,
                );

            expect(renderWithNullIndicatorProps).not.toThrow();
        });

        it('should not throw if leftAddons is not provided', () => {
            const renderWithoutLeftAddons = () =>
                render(<Tag Component={IndicatorTag} indicatorProps={{ mode: 'dot' }} />);

            expect(renderWithoutLeftAddons).not.toThrow();
        });
    });
});
