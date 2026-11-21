import React, {
    type MouseEvent,
    type ReactElement,
    type SyntheticEvent,
    useEffect,
    useState,
} from 'react';
import cn from 'classnames';

import { isIOS } from '../os';

import styles from './index.module.css';

export interface HapticPressProps {
    /** Один компонент с нативным button или a[href] в корне. */
    children: ReactElement;
    /** Растянуть область на ширину контейнера, например для Button block. */
    block?: boolean;
}

function stopPropagation(event: SyntheticEvent) {
    event.stopPropagation();
}

function handleTap(event: MouseEvent<HTMLLabelElement>) {
    event.stopPropagation();

    // Второй click приходит от самого switch при стандартной активации label.
    if (event.target !== event.currentTarget) return;

    const control = event.currentTarget.previousElementSibling;

    if (
        control instanceof HTMLElement &&
        control.matches('button:enabled, a[href]') &&
        control.getAttribute('aria-disabled') !== 'true'
    ) {
        control.click();
    } else {
        event.preventDefault();
    }
}

/**
 * Системный щелчок при тапе в Safari и PWA на iPhone. Кнопка или ссылка получает
 * программный click. Для действий, которым нужны исходный pointer event или меню
 * ссылки при удержании, используйте сам элемент без HapticPress.
 */
export function HapticPress({ children, block }: HapticPressProps) {
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        setSupported(isIOS() && 'switch' in HTMLInputElement.prototype);
    }, []);

    return (
        <span className={cn(styles.root, supported && styles.supported, block && styles.block)}>
            {children}
            {supported && (
                // Клавиатуру и вспомогательные технологии обслуживает исходная кнопка или ссылка.
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <label className={styles.surface} onClick={handleTap}>
                    {/* form='' исключает служебный input из form.elements родительской формы. */}
                    <input
                        type='checkbox'
                        {...{ switch: '' }}
                        hidden={true}
                        form=''
                        onInput={stopPropagation}
                        onChange={stopPropagation}
                    />
                </label>
            )}
        </span>
    );
}
