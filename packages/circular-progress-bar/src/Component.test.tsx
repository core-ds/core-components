import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { CircularProgressBar } from './Component';
import { getCircularProgressBarTestIds } from './utils/get-circular-progress-bar-test-ids';
import { act } from 'react-dom/test-utils';

describe('ProgressBar', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<CircularProgressBar value={20} />);
            expect(container).toMatchSnapshot();
        });

        it('should match with view snapshot', () => {
            const { container } = render(<CircularProgressBar value={20} view='negative' />);
            expect(container).toMatchSnapshot();
        });

        it('should match custom title & subtitle snapshot', () => {
            const { container } = render(
                <CircularProgressBar
                    value={20}
                    view='negative'
                    title={<span style={{ color: 'red' }}>title</span>}
                    subtitle={<span style={{ color: 'green' }}>subtitle</span>}
                />,
            );
            expect(container).toMatchSnapshot();
        });
    });

    describe('Attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const testId = 'test-id';
            const { getByTestId, queryByTestId } = render(
                <CircularProgressBar value={20} dataTestId={testId} subtitle='subtitle' />,
            );

            const testIds = getCircularProgressBarTestIds(testId);

            expect(getByTestId(testId)).toBeInTheDocument();
            expect(getByTestId(testIds.progressBar)).toBeInTheDocument();
            expect(getByTestId(testIds.title)).toBeInTheDocument();
            expect(queryByTestId(testIds.subtitle)).not.toBeInTheDocument();
            expect(getByTestId(testIds.circleProgressBar)).toBeInTheDocument();
            expect(getByTestId(testIds.circleProgressValue)).toBeInTheDocument();
        });

        it('should set `data-test-id` attribute for size more than 64', () => {
            const testId = 'test-id';
            const { getByTestId } = render(
                <CircularProgressBar
                    value={20}
                    size={80}
                    dataTestId={testId}
                    subtitle='subtitle'
                />,
            );

            const testIds = getCircularProgressBarTestIds(testId);

            expect(getByTestId(testIds.title)).toBeInTheDocument();
            expect(getByTestId(testIds.subtitle)).toBeInTheDocument();
        });

        it('should set `data-test-id` attribute for timer', () => {
            const testId = 'test-id';
            const { getByTestId } = render(
                <CircularProgressBar value={{ timer: 20 }} dataTestId={testId} />,
            );

            const testIds = getCircularProgressBarTestIds(testId);

            expect(getByTestId(testIds.title)).toBeInTheDocument();
        });

        it('should set `data-test-id` attribute for timer with size more than 64', () => {
            const testId = 'test-id';
            const { getByTestId } = render(
                <CircularProgressBar value={{ timer: 20 }} size={80} dataTestId={testId} />,
            );

            const testIds = getCircularProgressBarTestIds(testId);

            expect(getByTestId(testIds.title)).toBeInTheDocument();
        });

        it('should use passed `value`', () => {
            const { container } = render(<CircularProgressBar value={72} size={80} />);

            expect(container.querySelector('.progressCircle')).toHaveAttribute(
                'stroke-dashoffset',
                '63.335',
            );
        });

        it('should use passed `title`', () => {
            const text = 'test-text';
            const { container } = render(<CircularProgressBar value={72} title={text} />);

            expect(container.querySelector('.title')).toHaveTextContent(text);
        });

        it('should `title = value` if `title = undefined`', () => {
            const value = 72;
            const { container } = render(<CircularProgressBar value={value} />);

            expect(container.querySelector('.title')).toHaveTextContent(`${value}`);
        });

        it('should use passed `subtitle`', () => {
            const text = 'test-text';
            const { container } = render(
                <CircularProgressBar value={72} size={80} subtitle={text} />,
            );

            expect(container.querySelector('.subtitle')).toHaveTextContent(text);
        });

        it('should use only passed `children`', () => {
            const subtitle = 'test-subtitle';
            const text = 'test-text';
            const { container } = render(
                <CircularProgressBar value={72} subtitle={subtitle}>
                    {text}
                </CircularProgressBar>,
            );

            expect(container.querySelector('.labelWrapper')).toHaveTextContent(text);
            expect(container.querySelector('.subtitle')).not.toBeInTheDocument();
        });
    });

    describe('Classes tests', () => {
        it('should use default `size`', () => {
            const { container } = render(<CircularProgressBar value={20} />);

            expect(container.firstElementChild).toHaveClass('size-64');
        });

        it('should use passed `size`', () => {
            const { container } = render(<CircularProgressBar value={20} size={80} />);

            expect(container.firstElementChild).toHaveClass('size-80');
        });

        it('should set `className` class to root', () => {
            const className = 'test-class';
            const { container } = render(<CircularProgressBar value={20} className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set default color class', () => {
            const { container } = render(<CircularProgressBar value={20} />);

            expect(container.querySelector('.progressCircle')).toHaveClass('positive');
        });

        it('should set color class', () => {
            const { container } = render(<CircularProgressBar value={20} view='negative' />);

            expect(container.querySelector('.progressCircle')).toHaveClass('negative');
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<CircularProgressBar value={20} />);

        expect(unmount).not.toThrow();
    });

    describe('Timer tests', () => {
        jest.useFakeTimers();
        afterEach(cleanup);

        it('should set "timer" props', () => {
            render(<CircularProgressBar value={{ timer: 3599 }} />);

            const text = screen.queryByText('59:59');

            expect(text).toBeInTheDocument();
        });

        it('should set max value', () => {
            render(<CircularProgressBar value={{ timer: 999999 }} />);

            const text = screen.queryByText('59:59');

            expect(text).toBeInTheDocument();
        });

        it('should set min value', () => {
            render(<CircularProgressBar value={{ timer: -999999 }} />);

            const text = screen.queryByText('0:00');

            expect(text).toBeInTheDocument();
        });

        it('should "backward" counting', () => {
            render(<CircularProgressBar value={{ timer: 60 }} />);

            expect(screen.queryByText('1:00')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(15000);
            });

            expect(screen.queryByText('0:45')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(45000);
            });

            expect(screen.queryByText('0:00')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(10000);
            });

            expect(screen.queryByText('0:00')).toBeInTheDocument();
        });

        it('should "forward" counting', () => {
            render(<CircularProgressBar value={{ timer: 60, counting: 'forward' }} />);

            expect(screen.queryByText('0:00')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(15000);
            });

            expect(screen.queryByText('0:15')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(45000);
            });

            expect(screen.queryByText('1:00')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(10000);
            });

            expect(screen.queryByText('1:00')).toBeInTheDocument();
        });

        it('should "desc" directionType', () => {
            const testId = 'test-id';

            render(
                <CircularProgressBar
                    dataTestId={testId}
                    value={{ timer: 60 }}
                    directionType='desc'
                    size={80}
                />,
            );

            const testIds = getCircularProgressBarTestIds(testId);

            const circle = screen.getByTestId(testIds.circleProgressValue);

            expect(circle.getAttribute('stroke-dasharray')).toEqual('226.195');
            expect(circle.getAttribute('stroke-dashoffset')).toEqual('0.000'); // круг полностью заполнен

            act(() => {
                jest.advanceTimersByTime(15000);
            });

            expect(circle.getAttribute('stroke-dasharray')).toEqual('226.195');
            expect(circle.getAttribute('stroke-dashoffset')).toEqual('56.549'); // круг заполнен на 3/4

            act(() => {
                jest.advanceTimersByTime(45000);
            });

            expect(circle.getAttribute('stroke-dasharray')).toEqual('226.195');
            expect(circle.getAttribute('stroke-dashoffset')).toEqual('226.195'); // круг пустой
        });

        it('should "asc" directionType', () => {
            const testId = 'test-id';

            render(<CircularProgressBar dataTestId={testId} value={{ timer: 60 }} size={80} />);

            const testIds = getCircularProgressBarTestIds(testId);

            const circle = screen.getByTestId(testIds.circleProgressValue);

            expect(circle.getAttribute('stroke-dasharray')).toEqual('226.195');
            expect(circle.getAttribute('stroke-dashoffset')).toEqual('226.195'); // круг пустой

            act(() => {
                jest.advanceTimersByTime(15000);
            });

            expect(circle.getAttribute('stroke-dasharray')).toEqual('226.195');
            expect(circle.getAttribute('stroke-dashoffset')).toEqual('169.646'); // круг заполнен на 1/4

            act(() => {
                jest.advanceTimersByTime(45000);
            });

            expect(circle.getAttribute('stroke-dasharray')).toEqual('226.195');
            expect(circle.getAttribute('stroke-dashoffset')).toEqual('0.000'); // круг полностью заполнен
        });
    });

    describe('Color tests', () => {
        it('should set contentColor classname', () => {
            const testId = 'test-id';
            render(
                <CircularProgressBar
                    value={100}
                    size={80}
                    dataTestId={testId}
                    title='Title'
                    subtitle='Subtitle'
                    contentColor='primary'
                />,
            );

            const testIds = getCircularProgressBarTestIds(testId);
            const title = screen.getByTestId(testIds.title);
            const subtitle = screen.getByTestId(testIds.subtitle);

            expect(title).toHaveClass('primary');
            expect(subtitle).toHaveClass('primary');
        });

        it('should override contentColor classname to titleColor classname', () => {
            const testId = 'test-id';
            render(
                <CircularProgressBar
                    value={100}
                    size={80}
                    dataTestId={testId}
                    title='Title'
                    subtitle='Subtitle'
                    contentColor='primary'
                    titleColor='positive'
                />,
            );

            const testIds = getCircularProgressBarTestIds(testId);
            const title = screen.getByTestId(testIds.title);
            const subtitle = screen.getByTestId(testIds.subtitle);

            expect(title).toHaveClass('positive');
            expect(subtitle).toHaveClass('primary');
        });

        it('should override contentColor classname to subtitleColor classname', () => {
            const testId = 'test-id';
            render(
                <CircularProgressBar
                    value={100}
                    size={80}
                    dataTestId={testId}
                    title='Title'
                    subtitle='Subtitle'
                    contentColor='primary'
                    subtitleColor='positive'
                />,
            );

            const testIds = getCircularProgressBarTestIds(testId);
            const title = screen.getByTestId(testIds.title);
            const subtitle = screen.getByTestId(testIds.subtitle);

            expect(title).toHaveClass('primary');
            expect(subtitle).toHaveClass('positive');
        });
    });

    describe('Inline color tests', () => {
        it('should set "contentColor"', () => {
            const testId = 'test-id';

            render(
                <CircularProgressBar
                    value={100}
                    size={80}
                    dataTestId={testId}
                    title='Title'
                    subtitle='Subtitle'
                    contentColor='tomato'
                />,
            );

            const testIds = getCircularProgressBarTestIds(testId);
            const title = screen.getByTestId(testIds.title);
            const subtitle = screen.getByTestId(testIds.subtitle);

            expect(title).toHaveStyle({ color: 'rgb(255, 99, 71)' });
            expect(subtitle).toHaveStyle({ color: 'rgb(255, 99, 71)' });
        });

        it('should override "contentColor" with "titleColor"', () => {
            const testId = 'test-id';

            render(
                <CircularProgressBar
                    value={100}
                    size={80}
                    dataTestId={testId}
                    title='Title'
                    subtitle='Subtitle'
                    contentColor='tomato'
                    titleColor='blue'
                />,
            );

            const testIds = getCircularProgressBarTestIds(testId);
            const title = screen.getByTestId(testIds.title);
            const subtitle = screen.getByTestId(testIds.subtitle);

            expect(title).toHaveStyle({ color: 'rgb(0, 0, 255)' });
            expect(subtitle).toHaveStyle({ color: 'rgb(255, 99, 71)' });
        });

        it('should override "contentColor" with "subtitleColor"', () => {
            const testId = 'test-id';

            render(
                <CircularProgressBar
                    value={100}
                    size={80}
                    dataTestId={testId}
                    title='Title'
                    subtitle='Subtitle'
                    contentColor='tomato'
                    subtitleColor='blue'
                />,
            );

            const testIds = getCircularProgressBarTestIds(testId);
            const subtitle = screen.getByTestId(testIds.subtitle);
            const title = screen.getByTestId(testIds.title);

            expect(title).toHaveStyle({ color: 'rgb(255, 99, 71)' });
            expect(subtitle).toHaveStyle({ color: 'rgb(0, 0, 255)' });
        });
    });
});
