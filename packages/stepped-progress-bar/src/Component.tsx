import React, { FC } from 'react';
import cn from 'classnames';

import { Text } from '@alfalab/core-components-typography';

import { StepBar } from './components/step-bar';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type SteppedProgressBarView =
    | 'positive'
    | 'negative'
    | 'attention'
    | 'link'
    | 'tertiary'
    | 'secondary'
    | 'primary'
    | 'accent';

export type SteppedProgressBarProps = {
    /**
     * Общее количество шагов
     */
    maxStep: number;

    /**
     * Постфикс описание под прогрессбаром
     */
    description?: string;

    /**
     * Количество пройденных шагов
     */
    step?: number;

    /**
     * Цвет заполнения
     */
    view?: SteppedProgressBarView | SteppedProgressBarView[];

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Дополнительный класс
     */
    className?: string;
};

export const SteppedProgressBar: FC<SteppedProgressBarProps> = ({
    maxStep,
    description,
    step = 0,
    view,
    dataTestId,
    colors = 'default',
    className,
}) => {
    const validMaxSteps = maxStep <= 0 ? 1 : maxStep;
    const isViewString = typeof view === 'string';

    return (
        <div className={cn(styles.component, className)} data-test-id={dataTestId}>
            <div className={styles.stepsContainer}>
                {Array.from(Array(validMaxSteps), (_, index) => (
                    <StepBar
                        key={index}
                        isDone={index < step}
                        view={(isViewString ? view : view?.[index]) as SteppedProgressBarView}
                        classNameStep={colorStyles[colors].bar}
                    />
                ))}
            </div>
            {description && (
                <Text
                    tag='div'
                    className={cn(styles.description, colorStyles[colors].description)}
                    view='primary-small'
                >
                    Шаг {step} из {maxStep}: {description}
                </Text>
            )}
        </div>
    );
};
