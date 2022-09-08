import React, { ReactNode, useRef } from 'react';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import { Badge } from '@alfalab/core-components-badge';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';

import styles from './index.module.css';

export type StepProps = {
    /**
     * Название шага
     */
    children: ReactNode;

    /**
     * Номер шага
     */
    stepNumber: number;

    /**
     * Маркер того, что текущий шаг выбран
     */
    isSelected: boolean;

    /**
     * Маркер того, что текущий шаг доступен для клика
     */
    disabled: boolean;

    /**
     * Управление отображением номера шага
     */
    ordered?: boolean;

    /**
     * Включение / отключение интерактивности шагов
     */
    interactive?: boolean;

    /**
     * Маркер того, что на текущем шаге есть ошибка
     */
    isError: boolean;

    /**
     * Маркер того, что текущий шаг нужно пометить как завершенный
     */
    isStepCompleted: boolean;

    /**
     * Управление ориентацией компонента
     * @default false
     */
    isVerticalAlign?: boolean;

    /**
     * Указывает, является ли текущий шаг последним в списке
     */
    isNotLastStep?: boolean;

    /**
     * Обработчик нажатия на текущей шаг
     * @param stepNumber - номер шага
     */
    onClick: (stepNumber: number) => void;
};

export const Step: React.FC<StepProps> = ({
    children,
    stepNumber,
    isSelected,
    disabled,
    ordered,
    isError,
    isStepCompleted,
    onClick,
    interactive,
    isVerticalAlign,
    isNotLastStep
}) => {
    const stepRef = useRef<HTMLDivElement>(null);

    const [focused] = useFocus(stepRef, 'keyboard');

    const handleButtonClick = () => {
        if (!disabled && onClick) {
            onClick(stepNumber);
        }
    };

    const handleTextClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!interactive) {
            e.stopPropagation();
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };

    const getStepContent = () => {
        if (isStepCompleted && !isError) {
            return (
                <Badge
                    size='l'
                    view='icon'
                    iconColor='positive'
                    className={styles.badge}
                    content={<CheckmarkCircleMIcon />}
                />
            );
        }
        if (isError && !isSelected) {
            return '!';
        }
        if (!ordered) {
            return (
                <div className={styles.checkbox}>
                    <span className={styles.dot} />
                </div>
            );
        }

        return stepNumber;
    };

    const renderHyphen = () => (
        <div
            className={cn(styles.hyphen, {
                [styles.vertical]: isVerticalAlign,
                [styles.completed]: isStepCompleted,
            })}
        />
    )

    return (
        <div
            role='button'
            tabIndex={0}
            ref={stepRef}
            className={cn(styles.step, {
                [styles.completed]: isStepCompleted,
                [styles.error]: isError,
                [styles.selected]: isSelected,
                [styles.disabled]: disabled,
                [styles.focused]: focused,
                [styles.vertical]: isVerticalAlign,
                [styles.interactive]: interactive,
            })}
            onClick={handleButtonClick}
            onKeyDown={handleKeyDown}
        >
            <div
                className={cn(styles.indicator, {
                    [styles.vertical]: isVerticalAlign,
                    [styles.interactive]: interactive,
                })}
            >
                <div
                    className={cn(styles.option, {
                        [styles.unordered]: !ordered,
                        [styles.vertical]: isVerticalAlign
                    })}
                >
                    {getStepContent()}
                </div>
                {isNotLastStep && isVerticalAlign && renderHyphen()}
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div 
                className={cn(styles.text, {
                    [styles.interactive]: interactive
                })}
                onClick={handleTextClick}
            >
                {children}
            </div>
            {isNotLastStep && !isVerticalAlign && renderHyphen()}
        </div>
    );
};
