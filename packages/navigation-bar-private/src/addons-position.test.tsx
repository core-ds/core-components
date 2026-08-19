import React from 'react';
import { render } from '@testing-library/react';

import { NavigationBarPrivate } from './Component';
import { type ComputeTitleMargin, type NavigationBarPrivateProps } from './types';

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

const dti = 'navigation-bar-dti';
const contentClassName = 'test-content';

let mockedWidths = { left: 0, right: 0 };
let originalOffsetWidth: PropertyDescriptor | undefined;

beforeAll(() => {
    originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

    // leftAddonsRef/rightAddonsRef всегда указывают на .addonsWrapper —
    // различаем их по классу .rightAddons (см. index.module.css)
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        get(this: HTMLElement) {
            if (!this.classList.contains('addonsWrapper')) {
                return 0;
            }

            return this.classList.contains('rightAddons') ? mockedWidths.right : mockedWidths.left;
        },
    });
});

afterAll(() => {
    if (originalOffsetWidth) {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    }
});

type Margin = { left: number | null; right: number | null };

const px = (value: number | null) => (value === null ? '' : `${value}px`);

const renderBar = (
    props: Partial<NavigationBarPrivateProps> & { leftWidth?: number; rightWidth?: number },
) => {
    const { leftWidth = 0, rightWidth = 0, ...rest } = props;

    mockedWidths = { left: leftWidth, right: rightWidth };

    return render(
        <NavigationBarPrivate
            dataTestId={dti}
            view='mobile'
            titleSize='compact'
            title='Заголовок'
            contentClassName={contentClassName}
            leftAddons={leftWidth ? <span>left</span> : undefined}
            rightAddons={rightWidth ? <span>right</span> : undefined}
            {...rest}
        />,
    );
};

const assertMargins = (container: HTMLElement, contentMargin: Margin, mainLineMargin: Margin) => {
    const content = container.querySelector(`.${contentClassName}`) as HTMLElement;
    const mainLine = container.querySelector('.mainLine') as HTMLElement;

    expect(content).toBeInTheDocument();
    expect(mainLine).toBeInTheDocument();
    expect(content.style.marginLeft).toBe(px(contentMargin.left));
    expect(content.style.marginRight).toBe(px(contentMargin.right));
    expect(mainLine.style.marginLeft).toBe(px(mainLineMargin.left));
    expect(mainLine.style.marginRight).toBe(px(mainLineMargin.right));
};

describe('NavigationBarPrivate | default titleMargin (без computeTitleMargin)', () => {
    describe("align='center'", () => {
        it('равные ширины leftAddons/rightAddons — компенсации нет', () => {
            const { container } = renderBar({ align: 'center', leftWidth: 48, rightWidth: 48 });

            assertMargins(container, { left: 0, right: 0 }, { left: null, right: null });
        });

        it('rightAddons шире — компенсация слева на разницу ширин', () => {
            const { container } = renderBar({ align: 'center', leftWidth: 48, rightWidth: 96 });

            assertMargins(container, { left: 48, right: 0 }, { left: null, right: null });
        });

        it('leftAddons шире — компенсация справа на разницу ширин', () => {
            const { container } = renderBar({ align: 'center', leftWidth: 100, rightWidth: 40 });

            assertMargins(container, { left: 0, right: 60 }, { left: null, right: null });
        });

        it('результат не зависит от hasBackButton/hasCloser при тех же ширинах', () => {
            const { container: withoutControls } = renderBar({
                align: 'center',
                leftWidth: 48,
                rightWidth: 96,
            });

            const { container: withControls } = renderBar({
                align: 'center',
                leftWidth: 48,
                rightWidth: 96,
                hasBackButton: true,
                hasCloser: true,
            });

            assertMargins(withoutControls, { left: 48, right: 0 }, { left: null, right: null });
            assertMargins(withControls, { left: 48, right: 0 }, { left: null, right: null });
        });

        it('никогда не выставляет mainLineMargin', () => {
            const { container } = renderBar({
                align: 'center',
                hasBackButton: true,
                hasCloser: false,
            });

            assertMargins(container, { left: 0, right: 0 }, { left: null, right: null });
        });
    });

    describe("align='left'", () => {
        it('компенсации нет, независимо от ширин/back/closer', () => {
            const { container } = renderBar({
                align: 'left',
                leftWidth: 48,
                rightWidth: 96,
                hasBackButton: true,
                hasCloser: true,
            });

            assertMargins(container, { left: 0, right: 0 }, { left: null, right: null });
        });

        it('это align по умолчанию — тот же результат без явного align', () => {
            const { container } = renderBar({ leftWidth: 200, hasCloser: true });

            assertMargins(container, { left: 0, right: 0 }, { left: null, right: null });
        });
    });
});

describe('NavigationBarPrivate | computeTitleMargin (инъекция)', () => {
    it('используется переданная стратегия вместо дефолтной', () => {
        const fakeComputeTitleMargin: ComputeTitleMargin = () => ({
            contentMargin: { left: 111, right: 222 },
            mainLineMargin: { left: 5, right: 7 },
        });

        const { container } = renderBar({
            align: 'left',
            leftWidth: 48,
            rightWidth: 48,
            computeTitleMargin: fakeComputeTitleMargin,
        });

        assertMargins(container, { left: 111, right: 222 }, { left: 5, right: 7 });
    });

    it('получает в параметрах реальные align/back/closer/addons/ширины', () => {
        const fakeComputeTitleMargin = jest.fn<
            ReturnType<ComputeTitleMargin>,
            Parameters<ComputeTitleMargin>
        >(() => ({ contentMargin: { left: 0, right: 0 } }));

        renderBar({
            align: 'center',
            leftWidth: 48,
            rightWidth: 96,
            hasBackButton: true,
            hasCloser: false,
            computeTitleMargin: fakeComputeTitleMargin,
        });

        expect(fakeComputeTitleMargin).toHaveBeenCalledWith({
            align: 'center',
            hasBackButton: true,
            hasCloser: false,
            hasLeftAddons: true,
            hasRightAddons: true,
            leftAddonsWidth: 48,
            rightAddonsWidth: 96,
        });
    });
});
