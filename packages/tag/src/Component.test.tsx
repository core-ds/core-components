import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { IndicatorTag } from './components/indicator-tag';
import { TagDesktop as Tag } from './desktop';
import { resolveGeometry } from './utils';

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
                <IndicatorTag
                    size={size}
                    shape='rectangular'
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );
            const indicator = container.querySelector('[class*="indicator"]');

            expect(indicator).toHaveStyle({ left: '36px', top: '4px' });
        },
    );

    it.each([32, 40] as const)(
        'should place rounded dot indicator by circle diagonal for size=%s',
        (size) => {
            const { container } = render(
                <IndicatorTag
                    size={size}
                    shape='rounded'
                    indicatorProps={{ mode: 'dot' }}
                    leftAddons={<span />}
                />,
            );
            const indicator = container.querySelector('[class*="indicator"]') as HTMLElement;

            expect(parseFloat(indicator.style.left)).toBeLessThanOrEqual(36);
            expect(parseFloat(indicator.style.top)).toBeGreaterThanOrEqual(4);
        },
    );

    it('should use separate cutout gap for count indicator', () => {
        const dotGeometry = resolveGeometry({
            width: 40,
            height: 32,
            shape: 'rectangular',
            indicatorProps: { mode: 'dot' },
        });
        const countGeometry = resolveGeometry({
            width: 40,
            height: 32,
            shape: 'rectangular',
            indicatorProps: { mode: 'count', value: 7 },
        });

        expect(dotGeometry.cutoutR).toBe(6);
        expect(countGeometry.cutoutR).toBe(11);
        expect(dotGeometry.junctionR).toBe(4);
        expect(dotGeometry.junctionRect).toBe(6);
        expect(countGeometry.junctionR).toBe(2);
        expect(countGeometry.junctionRect).toBe(4);
    });
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
