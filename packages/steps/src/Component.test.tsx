import React from 'react';
import { render } from '@testing-library/react';

import { Steps } from './index';
import { getStepsTestIds } from './utils/getStepsTestIds';

describe('Steps', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            expect(
                render(
                    <Steps>
                        <div>Шаг 1</div>
                        <div>Шаг 2</div>
                    </Steps>,
                ),
            ).toMatchSnapshot();
        });
    });

    describe('Classes tests', () => {
        it('should set custom class', () => {
            const className = 'custom-class';
            const { container } = render(
                <Steps className={className}>
                    <div>Шаг 1</div>
                    <div>Шаг 2</div>
                </Steps>,
            );

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set `vertical` class', () => {
            const { container } = render(
                <Steps isVerticalAlign={true}>
                    <div>Шаг 1</div>
                    <div>Шаг 2</div>
                </Steps>,
            );

            expect(container.firstElementChild).toHaveClass('vertical');
        });
    });

    describe('Attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const dataTestId = 'test-id';

            const testIds = getStepsTestIds(dataTestId);

            const { getByTestId, getAllByTestId } = render(
                <Steps dataTestId={dataTestId}>
                    <div>Шаг 1</div>
                    <div>Шаг 2</div>
                </Steps>,
            );

            expect(getByTestId(dataTestId).tagName).toBe('DIV');
            expect(getByTestId(testIds.steps)).toBeInTheDocument();
            expect(getAllByTestId(testIds.step).length).toBe(2);
        });
    });

    describe('Render tests', () => {
        test('should render with default active step', () => {
            const defaultActiveStep = 2;

            const { container } = render(
                <Steps defaultActiveStep={defaultActiveStep}>
                    <div>Шаг 1</div>
                    <div>Шаг 2</div>
                </Steps>,
            );

            const steps = container.querySelectorAll('.step');

            expect(steps[0]).toHaveClass('completed');
            expect(steps[defaultActiveStep - 1]).toHaveClass('selected');
        });

        test('should render ordered steps', () => {
            const { queryAllByText } = render(
                <Steps>
                    <div>Подготовка</div>
                    <div>Завершение</div>
                </Steps>,
            );

            const steps = queryAllByText(/\d/);

            expect(steps[0].innerHTML).toBe('1');
            expect(steps[1].innerHTML).toBe('2');
        });

        test('should render unordered steps', () => {
            const { container } = render(
                <Steps ordered={false}>
                    <div>Шаг 1</div>
                    <div>Шаг 2</div>
                    <div>Шаг 3</div>
                </Steps>,
            );

            const unorderedSteps = container.querySelectorAll('.checkbox > .dot');

            expect(unorderedSteps.length).toBe(3);
        });

        test('should unmount without errors', () => {
            const { unmount } = render(
                <Steps>
                    <div>Шаг 1</div>
                    <div>Шаг 2</div>
                </Steps>,
            );

            expect(unmount).not.toThrow();
        });
    });

    describe('Custom dash color', () => {
        it('should set custom color', () => {
            const dataTestId = 'test-id';

            const testIds = getStepsTestIds(dataTestId);

            const { getAllByTestId } = render(
                <Steps activeStep={3} dataTestId={dataTestId} completedDashColor='tomato'>
                    <div>Шаг 1</div>
                    <div>Шаг 2</div>
                    <div>Шаг 3</div>
                </Steps>,
            );

            const stepCollection = getAllByTestId(testIds.step);
            const dash = stepCollection[0].querySelector('.dash');

            expect(dash).toHaveStyle('border-color:tomato');
        });

        it('should set custom var color', () => {
            const dataTestId = 'test-id';

            const testIds = getStepsTestIds(dataTestId);

            const { getAllByTestId } = render(
                <Steps
                    activeStep={3}
                    dataTestId={dataTestId}
                    completedDashColor='var(--color-dark-status-attention)'
                >
                    <div>Шаг 1</div>
                    <div>Шаг 2</div>
                    <div>Шаг 3</div>
                </Steps>,
            );

            const stepCollection = getAllByTestId(testIds.step);
            const dash = stepCollection[0].querySelector('.dash');

            expect(dash).toHaveStyle('border-color:var(--color-dark-status-attention)');
        });
    });
});
