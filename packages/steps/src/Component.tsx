import React, {
    type ComponentRef,
    type Reducer,
    type Ref,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';
import { compute } from 'compute-scroll-into-view';

import { IconButtonDesktop } from '@alfalab/core-components-icon-button/desktop';
import { isEndScrollPosition, isStartScrollPosition, noop } from '@alfalab/core-components-shared';
import { ChevronLeftCompactSIcon } from '@alfalab/icons-glyph/ChevronLeftCompactSIcon';
import { ChevronRightCompactSIcon } from '@alfalab/icons-glyph/ChevronRightCompactSIcon';

import { Step } from './components/step';
import { type StepIndicatorProps } from './components/step-indicator';
import { type CommonProps } from './types/common-props';

import styles from './index.module.css';

export interface StepsProps extends CommonProps {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Активный шаг, указанный по умолчанию
     * @default 1
     */
    defaultActiveStep?: number;

    /**
     * Активный шаг
     */
    activeStep?: number;

    /**
     * Управление возможностью отключения пометки пройденного шага
     * @default true
     */
    isMarkCompletedSteps?: boolean;

    /**
     * Кастомный метод для управления состоянием disabled шага и
     * возможностью перехода на этот шаг
     * @param stepNumber - номер шага
     * @return Флаг состояния disabled
     */
    checkIsStepDisabled?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага error
     * @param stepNumber - номер шага
     * @return Флаг состояния error
     */
    checkIsStepError?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага criticalError
     * @param stepNumber - номер шага
     * @return Флаг состояния error
     */
    checkIsStepCriticalError?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага warning
     * @param stepNumber - номер шага
     * @return Флаг состояния warning
     */
    checkIsStepWarning?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага waiting
     * @param stepNumber - номер шага
     * @return Флаг состояния waiting
     */
    checkIsStepWaiting?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага positive
     * @param stepNumber - номер шага
     * @return Флаг состояния positive
     */
    checkIsStepPositive?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для установки кастомного индикатора шага
     * @param stepNumber - номер шага
     * @return Объект StepIndicatorProps { className, content, iconColor } или null
     */
    checkIsStepCustom?: (stepNumber: number) => StepIndicatorProps | null;

    /**
     * Обработчик клика на шаг
     * @param stepNumber - номер активного шага
     */
    onChange?: (stepNumber: number) => void;

    /**
     * Скроллящийся контент компонента. Работает только в вертикальной ориентацией
     * @default false
     */
    scrollable?: boolean;
}

const scrollPositionReducer: Reducer<{ isStart: boolean; isEnd: boolean } | null, Element> = (
    _,
    element,
) => ({
    isStart: isStartScrollPosition(element, 'x'),
    isEnd: isEndScrollPosition(element, 'x'),
});

/**
 * Дополнительная прокрутка при клике на не поместившийся таб
 */
const ADDITIONAL_SCROLL_LEFT_VALUE = 50;

export const Steps: React.FC<StepsProps> = ({
    className,
    children,
    defaultActiveStep = 1,
    activeStep: activeStepProp,
    isMarkCompletedSteps = true,
    isVerticalAlign = false,
    ordered = true,
    interactive = true,
    fullWidth = false,
    minSpaceBetweenSteps = 24,
    checkIsStepDisabled,
    checkIsStepError,
    checkIsStepCriticalError,
    checkIsStepWarning,
    checkIsStepWaiting,
    checkIsStepPositive,
    checkIsStepCustom,
    onChange,
    dataTestId,
    completedDashColor,
    scrollable = false,
}) => {
    const stepsRef = useRef<Map<number, ComponentRef<typeof Step>> | null>(null);
    const getStepsRef = () => {
        if (!stepsRef.current) {
            stepsRef.current = new Map();
        }

        return stepsRef.current;
    };
    const listNodeRef = useRef<HTMLDivElement>(null);
    const scrollableNodeRef = useRef<HTMLDivElement>(null);
    const uncontrolled = activeStepProp === undefined;
    const [activeStep, setActiveStep] = useState(defaultActiveStep);
    const [showScrollControl, setShowScrollControl] = useState(false);
    const [scrollPosition, setScrollPosition] = useReducer(scrollPositionReducer, null);
    const [scrollBarWidth, setScrollBarWidth] = useState(0);
    const childrenCount = React.Children.count(children);
    const shouldRender = childrenCount > 0;
    const visibleActiveStep = uncontrolled ? activeStep : activeStepProp;

    useEffect(() => {
        const scrollableNode = scrollableNodeRef.current;
        const listNode = listNodeRef.current;

        if (shouldRender && !isVerticalAlign && scrollable && scrollableNode && listNode) {
            const resiveObserverCallback = () => {
                setShowScrollControl(listNode.scrollWidth - scrollableNode.clientWidth > 1);
                setScrollPosition(scrollableNode);
                setScrollBarWidth(
                    (prevScrollBarWidth) =>
                        scrollableNode.offsetWidth -
                        scrollableNode.clientWidth -
                        prevScrollBarWidth,
                );
            };

            const ro = new ResizeObserver(resiveObserverCallback);

            ro.observe(scrollableNode);
            ro.observe(listNode);

            return () => {
                ro.disconnect();
                setScrollBarWidth(0);
            };
        }

        return noop;
    }, [isVerticalAlign, scrollable, shouldRender]);

    useEffect(() => {
        const refs = stepsRef.current;
        const scrollableNode = scrollableNodeRef.current;
        const stepNode = refs?.get(visibleActiveStep);

        if (scrollableNode && stepNode) {
            const actions = compute(stepNode, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
                boundary: scrollableNode,
            });

            actions.forEach(({ el, left }) => {
                el.scrollTo({
                    left:
                        el.scrollLeft > left
                            ? left - ADDITIONAL_SCROLL_LEFT_VALUE
                            : left + ADDITIONAL_SCROLL_LEFT_VALUE,
                    behavior: 'smooth',
                });
            });
        }
    }, [visibleActiveStep]);

    const handleStepClick = (stepNumber: number) => {
        if (uncontrolled) {
            setActiveStep(stepNumber);
        }

        if (onChange) {
            onChange(stepNumber);
        }
    };

    if (!shouldRender) return null;

    const stepsRender = (
        <div
            ref={listNodeRef}
            data-test-id={dataTestId}
            className={cn(className, styles.component, { [styles.vertical]: isVerticalAlign })}
        >
            {React.Children.map(children, (step, index) => {
                const stepNumber = index + 1;
                const isSelected = stepNumber === visibleActiveStep;
                const isStepCompleted = isMarkCompletedSteps && stepNumber < visibleActiveStep;
                const disabled = checkIsStepDisabled ? checkIsStepDisabled(stepNumber) : false;
                const isPositive = checkIsStepPositive ? checkIsStepPositive(stepNumber) : false;
                const isError = checkIsStepError ? checkIsStepError(stepNumber) : false;
                const isCriticalError = checkIsStepCriticalError
                    ? checkIsStepCriticalError(stepNumber)
                    : false;
                const isWarning = checkIsStepWarning ? checkIsStepWarning(stepNumber) : false;
                const isWaiting = checkIsStepWaiting ? checkIsStepWaiting(stepNumber) : false;
                const customStepIndicator = checkIsStepCustom?.(stepNumber);
                const isNotLastStep = childrenCount !== stepNumber;
                const isInteractive = !disabled && interactive;
                const stepRef: Ref<ComponentRef<typeof Step>> = (node) => {
                    const refs = getStepsRef();

                    if (node) {
                        refs.set(stepNumber, node);
                    } else {
                        refs.delete(stepNumber);
                    }
                };

                return (
                    <Step
                        ref={stepRef}
                        stepNumber={stepNumber}
                        isSelected={isSelected}
                        isStepCompleted={isStepCompleted}
                        disabled={disabled}
                        isPositive={isPositive}
                        isError={isError}
                        isCriticalError={isCriticalError}
                        isWarning={isWarning}
                        isWaiting={isWaiting}
                        customStepIndicator={customStepIndicator}
                        onClick={handleStepClick}
                        ordered={ordered}
                        interactive={isInteractive}
                        isVerticalAlign={isVerticalAlign}
                        isNotLastStep={isNotLastStep}
                        key={stepNumber}
                        fullWidth={fullWidth}
                        minSpaceBetweenSteps={minSpaceBetweenSteps}
                        completedDashColor={completedDashColor}
                        dataTestId={dataTestId}
                    >
                        {step}
                    </Step>
                );
            })}
        </div>
    );

    if (isVerticalAlign || !scrollable) {
        return stepsRender;
    }

    const scrollToStart = () => {
        const scrollableNode = scrollableNodeRef.current;

        if (scrollableNode) {
            scrollableNode.scrollTo({
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    const scrollToEnd = () => {
        const scrollableNode = scrollableNodeRef.current;

        if (scrollableNode) {
            scrollableNode.scrollTo({
                left: scrollableNode.scrollWidth - scrollableNode.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
        setScrollPosition(event.currentTarget);
    };

    return (
        <div className={styles.scrollHide}>
            <div
                ref={scrollableNodeRef}
                className={styles.scrollable}
                style={{ marginBottom: -scrollBarWidth }}
                onScroll={handleScroll}
            >
                {stepsRender}
            </div>
            <div className={cn(styles.scrollControl, { [styles.show]: showScrollControl })}>
                <IconButtonDesktop
                    view='secondary'
                    size={40}
                    icon={ChevronLeftCompactSIcon}
                    onClick={scrollToStart}
                    disabled={scrollPosition?.isStart}
                />
                <IconButtonDesktop
                    view='secondary'
                    size={40}
                    icon={ChevronRightCompactSIcon}
                    onClick={scrollToEnd}
                    disabled={scrollPosition?.isEnd}
                />
            </div>
        </div>
    );
};
