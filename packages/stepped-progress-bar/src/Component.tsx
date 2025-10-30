import React, { type FC } from 'react';
import cn from 'classnames';

import { Text } from '@alfalab/core-components-typography';

import { StepBar } from './components/step-bar';
import { type SteppedProgressBarView } from './types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export interface SteppedProgressBarProps {
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
    view?: SteppedProgressBarView | SteppedProgressBarView[] | string | string[];

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
}

export const SteppedProgressBar: FC<SteppedProgressBarProps> = ({
    maxStep,
    description,
    step = 0,
    view,
    dataTestId,
    colors = 'default',
    className,
}) => {
    const validMaxSteps = Math.max(1, maxStep);
    const isViewString = typeof view === 'string';
    const currentColors = colorStyles[colors];

    return (
        <div className={cn(styles.component, className)} data-test-id={dataTestId}>
            <div className={styles.stepsContainer}>
                {Array.from({ length: validMaxSteps }, (_, index) => (
                    <StepBar
                        key={index}
                        isDone={index < step}
                        view={isViewString ? view : view?.[index]}
                        classNameStep={currentColors.bar}
                    />
                ))}
            </div>
            {description && (
                <Text
                    tag='div'
                    className={cn(styles.description, currentColors.description)}
                    view='primary-small'
                >
                    Шаг {step} из {maxStep}: {description}
                </Text>
            )}
        </div>
    );
};
