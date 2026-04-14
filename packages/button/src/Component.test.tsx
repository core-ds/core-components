import React, { MouseEvent, useState, FC, forwardRef } from 'react';
import {
    render,
    fireEvent,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import { getButtonTestIds } from './utils';

import { ButtonDesktop as Button, ButtonDesktopProps as ButtonProps } from './desktop';
import { LOADER_MIN_DISPLAY_INTERVAL } from './constants/loader-min-display-interval';

const dataTestId = 'test-id';

const ButtonWithLoader: FC<ButtonProps & { timeout: number }> = ({ timeout, ...restProps }) => {
    const [loading, setLoading] = useState(false);

    return (
        <Button
            {...restProps}
            loading={loading}
            onClick={() => {
                setLoading(true);

                setTimeout(() => {
                    setLoading(false);
                }, timeout);
            }}
        >
            Button
        </Button>
    );
};

describe('Button', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            expect(render(<Button />)).toMatchSnapshot();
        });

        it('should render left addons', () => {
            expect(render(<Button leftAddons={<div>Left addons</div>} />)).toMatchSnapshot();
        });

        it('should render right addons', () => {
            expect(render(<Button rightAddons={<div>Right addons</div>} />)).toMatchSnapshot();
        });

        it('should render button by default', () => {
            expect(render(<Button />)).toMatchSnapshot();
        });

        it('should render anchor if href pass', () => {
            expect(render(<Button href='https://some-url' />)).toMatchSnapshot();
        });

        it('should render loader if loading pass', () => {
            expect(render(<Button loading={true} />)).toMatchSnapshot();
        });

        it('should render loader if loading & href pass', () => {
            expect(render(<Button loading={true} href='https://some-url' />)).toMatchSnapshot();
        });
    });

    describe('Attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const dti = 'button-dti';
            const { getByTestId } = render(<Button dataTestId={dti} loading />);

            const testIds = getButtonTestIds(dti);

            expect(getByTestId(testIds.button)).toBeInTheDocument();
            expect(getByTestId(testIds.spinner)).toBeInTheDocument();
            expect(getByTestId(testIds.button).tagName).toBe('BUTTON');
        });

        it('should set rel="noreferrer noopener" if "href" and target="_blank" are passed', () => {
            const { container } = render(<Button href='#' target='_blank' />);

            const relAttr = container.firstElementChild?.getAttribute('rel');

            expect(relAttr).toBe('noreferrer noopener');
        });

        it('should set type="button" by default', () => {
            const { container } = render(<Button />);
            expect(container.firstElementChild).toHaveAttribute('type', 'button');
        });

        it('should set type attribute', () => {
            const type = 'submit';
            const { container } = render(<Button type={type} />);
            expect(container.firstElementChild).toHaveAttribute('type', type);
        });

        it('should set disabled attribute to <button>', () => {
            const { container } = render(<Button disabled={true} />);
            expect(container.firstElementChild).toHaveAttribute('disabled');
        });

        it('should set disabled attribute to <a>', () => {
            const { container } = render(<Button href='test' disabled={true} />);
            expect(container.firstElementChild).toHaveAttribute('disabled');
        });
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const className = 'test-class';
            const { container } = render(<Button className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set `spinnerClassName` class', () => {
            const className = 'spinner-class';
            const spinnerDti = `${dataTestId}-loader`;
            const { getByTestId } = render(
                <Button spinnerClassName={className} dataTestId={dataTestId} loading={true} />,
            );

            const spinner = getByTestId(spinnerDti);

            expect(spinner).toHaveClass(className);
        });

        it('should set `size` class', () => {
            const size = 56;
            const { container } = render(<Button size={size} />);

            expect(container.firstElementChild).toHaveClass(`size-${size}`);
        });

        it('should set `block` class', () => {
            const { container } = render(<Button block={true} />);

            expect(container.firstElementChild).toHaveClass('block');
        });

        it('should set `view` class', () => {
            const view = 'primary';
            const { container } = render(<Button view={view} />);

            expect(container.firstElementChild).toHaveClass(view);
        });

        it('should set `iconOnly` class', () => {
            const { container } = render(<Button />);

            expect(container.firstElementChild).toHaveClass('iconOnly');
        });

        it('should set `nowrap` class', () => {
            render(<Button nowrap={true}>Button</Button>);

            expect(screen.getByText('Button')).toHaveClass('nowrap');
        });

        it('should set `hug` class', () => {
            const { container } = render(<Button textResizing='hug'>Button</Button>);

            expect(container.firstElementChild).toHaveClass('hug');
        });

        it('should set `fill` class', () => {
            const { container } = render(<Button textResizing='fill'>Button</Button>);

            expect(container.firstElementChild).toHaveClass('fill');
        });

        it('should set `rounded` class', () => {
            const { container } = render(<Button shape='rounded'>Button</Button>);

            expect(container.firstElementChild).toHaveClass('rounded');
        });

        it('should set `allowBackdropBlur` class', () => {
            const { container } = render(<Button allowBackdropBlur={true} />);

            expect(container.firstElementChild).toHaveClass('allowBackdropBlur');
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onClick` prop', () => {
            const cb = jest.fn();

            const { getByTestId } = render(<Button onClick={cb} dataTestId={dataTestId} />);

            fireEvent.click(getByTestId(dataTestId));

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should not call `onClick` prop if disabled', () => {
            const cb = jest.fn();

            const { getByTestId } = render(
                <Button onClick={cb} dataTestId={dataTestId} disabled={true} />,
            );

            fireEvent.click(getByTestId(dataTestId));

            expect(cb).not.toHaveBeenCalled();
        });

        it('should not call `onClick` prop if disabled and href passed', () => {
            const cb = jest.fn();

            const { getByTestId } = render(
                <Button onClick={cb} href='test' dataTestId={dataTestId} disabled={true} />,
            );

            fireEvent.click(getByTestId(dataTestId));

            expect(cb).not.toHaveBeenCalled();
        });

        /**
         * Тест нужен для проверки типа eventTarget (HTMLButtonElement/HTMLAnchorElement).
         * Если тест скомпилился - то все ок.
         */
        it('target should contain button element', () => {
            const { getByTestId } = render(<Button onClick={cb} dataTestId={dataTestId} />);

            const buttonNode = getByTestId(dataTestId);

            function cb(event: MouseEvent<HTMLButtonElement>) {
                expect(event.target).toBe(buttonNode);
            }

            fireEvent.click(buttonNode, { target: buttonNode });
        });

        /**
         * Тест нужен для проверки типа eventTarget (HTMLButtonElement/HTMLAnchorElement).
         * Если тест скомпилился - то все ок.
         */
        it('target should contain anchor element', () => {
            const { getByTestId } = render(
                <Button onClick={cb} dataTestId={dataTestId} href='#' />,
            );

            const anchorNode = getByTestId(dataTestId);

            function cb(event: MouseEvent<HTMLAnchorElement>) {
                expect(event.target).toBe(anchorNode);
            }

            fireEvent.click(anchorNode, { target: anchorNode });
        });
    });

    describe('Loader tests', () => {
        it('should keep loader during LOADER_MIN_DISPLAY_INTERVAL ms', async () => {
            const { getByTestId, container } = render(
                <ButtonWithLoader timeout={100} dataTestId={dataTestId} />,
            );

            const button = getByTestId(dataTestId);
            const getLoader = () => container.querySelector('svg');

            const start = Date.now();

            await fireEvent.click(button);

            await waitFor(() => expect(getLoader()).toBeInTheDocument());

            await waitForElementToBeRemoved(getLoader(), { timeout: 5000 });

            const duration = Date.now() - start;

            expect(duration).toBeGreaterThanOrEqual(LOADER_MIN_DISPLAY_INTERVAL);
        });

        it('should keep loader during TIMEOUT ms, if TIMEOUT > LOADER_MIN_DISPLAY_INTERVAL', async () => {
            const TIMEOUT = LOADER_MIN_DISPLAY_INTERVAL + 500;

            const { getByTestId, container } = render(
                <ButtonWithLoader timeout={TIMEOUT} dataTestId={dataTestId} />,
            );

            const button = getByTestId(dataTestId);
            const getLoader = () => container.querySelector('svg');

            const start = Date.now();

            fireEvent.click(button);

            await waitFor(() => expect(getLoader()).toBeInTheDocument());

            await waitForElementToBeRemoved(getLoader(), { timeout: 5000 });

            const duration = Date.now() - start;

            expect(duration).toBeGreaterThanOrEqual(TIMEOUT);
        });
    });

    describe('Custom component', () => {
        it('should use custom component', () => {
            const cb = jest.fn();
            cb.mockReturnValue(null);

            render(<Button Component={forwardRef(cb)} dataTestId={dataTestId} />);

            expect(cb).toHaveBeenCalled();

            const props = cb.mock.calls[0][0];
            expect(props['data-test-id']).toBe(dataTestId);
        });

        it('should pass `to` instead `href` to custom component', () => {
            const cb = jest.fn();
            cb.mockReturnValue(null);

            render(<Button Component={forwardRef(cb)} href='test' />);

            expect(cb).toHaveBeenCalled();

            const props = cb.mock.calls[0][0];

            expect(props.href).toBeFalsy();
            expect(props.to).toBe('test');
        });
    });

    describe('props test', () => {
        it('should show hint', () => {
            const hint = 'hint';
            render(
                <Button size={56} hint={hint}>
                    Button
                </Button>,
            );

            expect(screen.queryByText(hint)).toBeInTheDocument();
        });

        it('should not show hint', () => {
            const hint = 'hint';
            render(
                <Button size={40} hint={hint}>
                    Button
                </Button>,
            );

            expect(screen.queryByText(hint)).not.toBeInTheDocument();
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(
            <Button leftAddons={<span>Left</span>} rightAddons={<span>Right</span>}>
                Text
            </Button>,
        );

        expect(unmount).not.toThrow();
    });
});
