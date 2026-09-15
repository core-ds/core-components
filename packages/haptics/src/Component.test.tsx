import React, { type ComponentType } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { CoreConfigContext } from '@alfalab/core-components-config';
import { isIOS } from '@alfalab/core-components-shared';

import { HapticFallback } from './components/haptic-fallback';
import { defaultPatterns } from './patterns';
import { type HapticBaseProps } from './typings';
import { TICK_ID } from './utils';
import { HapticA, HapticButton, HapticInput } from './index';

jest.mock('@alfalab/core-components-shared', () => ({
    ...jest.requireActual('@alfalab/core-components-shared'),
    isIOS: jest.fn(() => false),
}));

const mockIsIOS = isIOS as jest.Mock;
const vibrate = jest.fn(() => true);

const setVibrate = (enabled: boolean) => {
    if (enabled) {
        Object.defineProperty(navigator, 'vibrate', {
            value: vibrate,
            configurable: true,
            writable: true,
        });
    } else {
        delete (navigator as { vibrate?: unknown }).vibrate;
    }
};

const enableIosFallback = () => {
    setVibrate(false);
    mockIsIOS.mockReturnValue(true);
};

const dataTestId = 'test-id';
const fallbackTestId = `${dataTestId}-fallback`;

type AdapterProps = HapticBaseProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (event: any) => void;
    disabled?: boolean;
    children?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref?: any;
    [attribute: string]: unknown;
};

type AdapterCase = {
    name: string;
    Component: ComponentType<AdapterProps>;
    tagName: 'BUTTON' | 'A' | 'INPUT';
    /** Нативные атрибуты для проверки проброса. */
    nativeProps: Record<string, string>;
    /** Базовые пропсы для снапшота. */
    baseProps: AdapterProps;
    /** Учитывает ли адаптер `disabled` при решении о fallback. */
    supportsDisabled: boolean;
    /** Оборачивает ли элемент и overlay в `span.wrapper`. */
    wrapped: boolean;
};

const adapters: AdapterCase[] = [
    {
        name: 'HapticButton',
        Component: HapticButton as ComponentType<AdapterProps>,
        tagName: 'BUTTON',
        nativeProps: { type: 'submit', name: 'action' },
        baseProps: { children: 'Кнопка' },
        supportsDisabled: true,
        wrapped: true,
    },
    {
        name: 'HapticA',
        Component: HapticA as ComponentType<AdapterProps>,
        tagName: 'A',
        nativeProps: { href: 'https://example.com', target: '_blank', rel: 'noopener' },
        baseProps: { href: 'https://example.com', children: 'Ссылка' },
        supportsDisabled: false,
        wrapped: true,
    },
    {
        name: 'HapticInput',
        Component: HapticInput as ComponentType<AdapterProps>,
        tagName: 'INPUT',
        nativeProps: { type: 'checkbox', name: 'agree' },
        baseProps: { type: 'checkbox' },
        supportsDisabled: true,
        wrapped: false,
    },
];

describe('Haptics', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
        setVibrate(true);
        mockIsIOS.mockReturnValue(false);
    });

    describe.each(adapters)(
        '$name',
        ({ Component, tagName, nativeProps, baseProps, supportsDisabled, wrapped }) => {
            describe('Attributes tests', () => {
                it('should set `data-test-id` attribute', () => {
                    const { getByTestId } = render(<Component dataTestId={dataTestId} />);

                    expect(getByTestId(dataTestId).tagName).toBe(tagName);
                });

                it('should pass native attributes', () => {
                    const { getByTestId } = render(
                        <Component dataTestId={dataTestId} {...nativeProps} />,
                    );

                    Object.entries(nativeProps).forEach(([attribute, value]) => {
                        expect(getByTestId(dataTestId)).toHaveAttribute(attribute, value);
                    });
                });

                it('should not render `data-haptic-preset` on element', () => {
                    const { getByTestId } = render(
                        <Component dataTestId={dataTestId} data-haptic-preset='selection' />,
                    );

                    expect(getByTestId(dataTestId)).not.toHaveAttribute('data-haptic-preset');
                });

                it('should forward ref to native element', () => {
                    const ref = jest.fn();

                    render(<Component {...baseProps} ref={ref} />);

                    expect(ref.mock.calls[0][0].tagName).toBe(tagName);
                });
            });

            describe('Fallback tests', () => {
                it('should render only native element without iOS fallback', () => {
                    const { container, queryByTestId } = render(
                        <Component dataTestId={dataTestId} data-haptic-preset='selection' />,
                    );

                    expect(container.children).toHaveLength(1);
                    expect(container.firstElementChild?.tagName).toBe(tagName);
                    expect(queryByTestId(fallbackTestId)).toBeNull();
                });

                it('should render overlay on iOS without Vibration API', () => {
                    enableIosFallback();

                    const { container, getByTestId } = render(
                        <Component dataTestId={dataTestId} data-haptic-preset='selection' />,
                    );
                    const overlay = getByTestId(fallbackTestId);

                    expect(overlay).toHaveAttribute('for', TICK_ID);

                    if (wrapped) {
                        expect(container.firstElementChild?.tagName).toBe('SPAN');
                        expect(container.firstElementChild).toHaveClass('wrapper');
                        expect(overlay).not.toHaveClass('overlayLabelOrigin');
                    } else {
                        expect(container.children).toHaveLength(2);
                        expect(container.firstElementChild?.tagName).toBe(tagName);
                        expect(container.querySelector('.wrapper')).toBeNull();
                        expect(overlay).toHaveClass('overlayLabelOrigin');
                    }
                });

                it('should render overlay without preset because of default `selection`', () => {
                    enableIosFallback();

                    const { getByTestId } = render(<Component dataTestId={dataTestId} />);

                    expect(getByTestId(fallbackTestId)).toBeInTheDocument();
                });

                it('should not render overlay for `data-haptic-preset={false}`', () => {
                    enableIosFallback();

                    const { queryByTestId } = render(
                        <Component dataTestId={dataTestId} data-haptic-preset={false} />,
                    );

                    expect(queryByTestId(fallbackTestId)).toBeNull();
                });

                if (supportsDisabled) {
                    it('should not render overlay when disabled', () => {
                        enableIosFallback();

                        const { queryByTestId } = render(
                            <Component
                                dataTestId={dataTestId}
                                data-haptic-preset='selection'
                                disabled={true}
                            />,
                        );

                        expect(queryByTestId(fallbackTestId)).toBeNull();
                    });
                }
            });

            describe('Callbacks tests', () => {
                it('should call `onClick` prop', () => {
                    const onClick = jest.fn();
                    const { getByTestId } = render(
                        <Component dataTestId={dataTestId} onClick={onClick} />,
                    );

                    fireEvent.click(getByTestId(dataTestId));

                    expect(onClick).toHaveBeenCalledTimes(1);
                });

                it('should vibrate with preset pattern on click', () => {
                    const { getByTestId } = render(
                        <Component dataTestId={dataTestId} data-haptic-preset='rigid' />,
                    );

                    fireEvent.click(getByTestId(dataTestId));

                    expect(vibrate).toHaveBeenCalledWith([
                        defaultPatterns.rigid.pattern[0].duration,
                    ]);
                });

                it('should vibrate with custom preset on click', () => {
                    const { getByTestId } = render(
                        <Component
                            dataTestId={dataTestId}
                            data-haptic-preset={{ duration: 20, intensity: 1, repeat: 2 }}
                        />,
                    );

                    fireEvent.click(getByTestId(dataTestId));

                    expect(vibrate).toHaveBeenCalledWith([20, 40, 20]);
                });

                it('should vibrate with default `selection` preset without prop', () => {
                    const { getByTestId } = render(<Component dataTestId={dataTestId} />);

                    fireEvent.click(getByTestId(dataTestId));

                    expect(vibrate).toHaveBeenCalledTimes(1);
                });

                it('should not vibrate for `data-haptic-preset={false}`', () => {
                    const { getByTestId } = render(
                        <Component dataTestId={dataTestId} data-haptic-preset={false} />,
                    );

                    fireEvent.click(getByTestId(dataTestId));

                    expect(vibrate).not.toHaveBeenCalled();
                });

                it('should not vibrate when haptics disabled in config', () => {
                    const { getByTestId } = render(
                        <CoreConfigContext.Provider
                            value={{
                                breakpoint: 1024,
                                client: 'mobile',
                                haptics: { enabled: false },
                            }}
                        >
                            <Component dataTestId={dataTestId} data-haptic-preset='rigid' />
                        </CoreConfigContext.Provider>,
                    );

                    fireEvent.click(getByTestId(dataTestId));

                    expect(vibrate).not.toHaveBeenCalled();
                });

                it('should not vibrate when `onClick` prevents default', () => {
                    const { getByTestId } = render(
                        <Component
                            dataTestId={dataTestId}
                            data-haptic-preset='rigid'
                            onClick={(event: Event) => event.preventDefault()}
                        />,
                    );

                    fireEvent.click(getByTestId(dataTestId));

                    expect(vibrate).not.toHaveBeenCalled();
                });

                it('should proxy overlay tap to native element click', () => {
                    enableIosFallback();

                    const onClick = jest.fn();
                    const { getByTestId } = render(
                        <Component
                            dataTestId={dataTestId}
                            data-haptic-preset='rigid'
                            onClick={onClick}
                        />,
                    );

                    fireEvent.click(getByTestId(fallbackTestId));

                    expect(onClick).toHaveBeenCalledTimes(1);
                    expect(vibrate).not.toHaveBeenCalled();
                });
            });

            it('should unmount without errors', () => {
                const { unmount } = render(
                    <Component {...baseProps} data-haptic-preset='selection' />,
                );

                expect(unmount).not.toThrow();
            });
        },
    );

    describe('HapticFallback', () => {
        describe('Attributes tests', () => {
            it('should set `data-test-id` attribute with `-fallback` modifier', () => {
                const { getByTestId } = render(
                    <HapticFallback onTap={jest.fn()} dataTestId={dataTestId} />,
                );

                expect(getByTestId(fallbackTestId)).toBeInTheDocument();
            });

            it('should not set `data-test-id` without `dataTestId`', () => {
                const { container } = render(<HapticFallback onTap={jest.fn()} />);

                expect(container.querySelector('[data-test-id]')).toBeNull();
            });

            it('should link label to shared switch and hide it from a11y tree', () => {
                const { getByTestId } = render(
                    <HapticFallback onTap={jest.fn()} dataTestId={dataTestId} />,
                );
                const label = getByTestId(fallbackTestId);

                expect(label.tagName).toBe('LABEL');
                expect(label).toHaveAttribute('for', TICK_ID);
                expect(label).toHaveAttribute('aria-hidden', 'true');
            });

            it('should create shared switch DOM on mount', () => {
                render(<HapticFallback onTap={jest.fn()} />);

                expect(document.getElementById(TICK_ID)).toBeInTheDocument();
            });
        });

        describe('Classes tests', () => {
            it('should set base class by default', () => {
                const { getByTestId } = render(
                    <HapticFallback onTap={jest.fn()} dataTestId={dataTestId} />,
                );

                expect(getByTestId(fallbackTestId)).toHaveClass('overlayLabel');
                expect(getByTestId(fallbackTestId)).not.toHaveClass('overlayLabelOrigin');
            });

            it('should set `origin` class for `origin` placement', () => {
                const { getByTestId } = render(
                    <HapticFallback onTap={jest.fn()} dataTestId={dataTestId} placement='origin' />,
                );

                expect(getByTestId(fallbackTestId)).toHaveClass('overlayLabelOrigin');
            });
        });

        describe('Callbacks tests', () => {
            it('should call `onTap` on click', () => {
                const onTap = jest.fn();
                const { getByTestId } = render(
                    <HapticFallback onTap={onTap} dataTestId={dataTestId} />,
                );

                fireEvent.click(getByTestId(fallbackTestId));

                expect(onTap).toHaveBeenCalledTimes(1);
            });

            it('should stop click propagation', () => {
                const onParentClick = jest.fn();
                const { getByTestId } = render(
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div onClick={onParentClick}>
                        <HapticFallback onTap={jest.fn()} dataTestId={dataTestId} />
                    </div>,
                );

                fireEvent.click(getByTestId(fallbackTestId));

                expect(onParentClick).not.toHaveBeenCalled();
            });
        });

        it('should unmount without errors', () => {
            const { unmount } = render(<HapticFallback onTap={jest.fn()} />);

            expect(unmount).not.toThrow();
        });
    });
});
