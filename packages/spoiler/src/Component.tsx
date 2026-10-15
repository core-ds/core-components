import React, { forwardRef, useMemo, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { useParticles } from './hooks/use-particles';
import { composeHandlers } from './compose-handlers';
import { type SpoilerProps } from './types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = { default: defaultColors, inverted: invertedColors };

const hasSelectionInside = (root: HTMLElement | null) => {
    const selection = root?.ownerDocument.defaultView?.getSelection();

    return Boolean(
        root &&
            selection &&
            !selection.isCollapsed &&
            selection.toString() &&
            selection.anchorNode &&
            selection.focusNode &&
            root.contains(selection.anchorNode) &&
            root.contains(selection.focusNode),
    );
};

/** Скрывает содержимое частицами, сохраняя текстовые строки или размеры элемента. */
export const Spoiler = forwardRef<HTMLElement, SpoilerProps>(
    (
        {
            children,
            mode = 'text',
            revealed: controlledRevealed,
            defaultRevealed = false,
            onRevealedChange,
            revealOn = 'click',
            revealOnce = false,
            colors = 'default',
            className,
            dataTestId,
            onClick,
            onKeyDown,
            'aria-label': ariaLabel,
            ...restProps
        },
        forwardedRef,
    ) => {
        const [ownRevealed, setOwnRevealed] = useState(defaultRevealed);
        const revealed = controlledRevealed ?? ownRevealed;
        const revealedOnce = revealOn === 'click' && revealOnce && revealed;
        const interactive = revealOn === 'click' && !revealedOnce;
        const Container = mode === 'element' ? 'div' : 'span';
        const revealLabel =
            mode === 'element' ? 'Показать скрытое содержимое' : 'Показать скрытый текст';
        const { rootRef, contentRef, anchorRef, canvasRef, ready } = useParticles({
            mode,
            revealed,
            colors,
        });
        const mergedRef = useMemo(
            () => mergeRefs([rootRef, forwardedRef]),
            [rootRef, forwardedRef],
        );

        useLayoutEffect_SAFE_FOR_SSR(() => {
            // React 16–19 по-разному обрабатывают inert, поэтому устанавливаем атрибут в DOM.
            contentRef.current?.toggleAttribute('inert', !revealed);
        }, [revealed, mode, contentRef]);

        const changeRevealed = (nextRevealed: boolean) => {
            if (nextRevealed === revealed) return;
            if (controlledRevealed === undefined) setOwnRevealed(nextRevealed);
            onRevealedChange?.(nextRevealed);
        };
        const toggle = () => {
            if (interactive) changeRevealed(!revealed);
        };
        let tabIndex: number | undefined;

        if (interactive) tabIndex = 0;
        if (revealedOnce) tabIndex = -1;

        const handleClick = () => {
            if (revealed && hasSelectionInside(rootRef.current)) return;
            toggle();
        };
        const canvas = (
            <canvas
                ref={canvasRef}
                className={cn(styles.canvas, colorStyles[colors].canvas)}
                aria-hidden='true'
            />
        );

        return (
            // span сохраняет строки; div допускает произвольное блочное содержимое.
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <Container
                {...restProps}
                ref={mergedRef}
                className={cn(styles.component, className, {
                    [styles.hidden]: !revealed,
                    [colorStyles[colors].fallback]: !revealed && !ready,
                    [styles.interactive]: interactive,
                    [styles.element]: mode === 'element',
                })}
                data-test-id={dataTestId}
                data-state={revealed ? 'revealed' : 'hidden'}
                role={interactive ? 'button' : undefined}
                // Ручной режим не добавляет элемент в порядок табуляции.
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={tabIndex}
                aria-expanded={interactive ? revealed : undefined}
                aria-label={ariaLabel ?? (interactive && !revealed ? revealLabel : undefined)}
                onClick={composeHandlers(onClick, handleClick)}
                onKeyDown={composeHandlers(onKeyDown, (event) => {
                    if (
                        interactive &&
                        !event.repeat &&
                        (event.key === 'Enter' || event.key === ' ')
                    ) {
                        event.preventDefault();
                        toggle();
                    }
                })}
            >
                <Container
                    // Container и фактический узел совпадают; div-ref совместим и со span.
                    ref={contentRef as React.RefObject<HTMLDivElement>}
                    className={styles.content}
                    data-spoiler-content=''
                    aria-hidden={!revealed || undefined}
                >
                    {children}
                </Container>
                {mode === 'text' ? (
                    <span ref={anchorRef} className={styles.anchor} aria-hidden='true'>
                        {canvas}
                    </span>
                ) : (
                    canvas
                )}
            </Container>
        );
    },
);

Spoiler.displayName = 'Spoiler';
