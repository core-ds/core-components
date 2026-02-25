import React, { type FC } from 'react';
import cn from 'classnames';

import { TypographyText } from '@alfalab/core-components-typography';

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

export type CustomProgressBarView = { background: string };
export type SteppedProgressBarViewValue = SteppedProgressBarView | CustomProgressBarView;

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
    view?: SteppedProgressBarViewValue | SteppedProgressBarViewValue[];

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
    const isViewArray = Array.isArray(view);
    const currentColors = colorStyles[colors];

    return (
        <div className={cn(styles.component, className)} data-test-id={dataTestId}>
            <div className={styles.stepsContainer}>
                {Array.from({ length: validMaxSteps }, (_, index) => (
                    <StepBar
                        key={index}
                        isDone={index < step}
                        view={isViewArray ? view[index] : view}
                        classNameStep={currentColors.bar}
                    />
                ))}
            </div>
            {description && (
                <TypographyText
                    tag='div'
                    className={cn(styles.description, currentColors.description)}
                    view='primary-small'
                >
                    Шаг {step} из {maxStep}: {description}
                </TypographyText>
            )}
        </div>
    );
};
