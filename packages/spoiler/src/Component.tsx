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

const NESTED_CONTROL = [
    'a[href]',
    'button',
    'input',
    'select',
    'textarea',
    'summary',
    'label',
    '[tabindex]',
    '[contenteditable]:not([contenteditable="false"])',
    '[role="button"]',
    '[role="link"]',
    '[role="checkbox"]',
    '[role="switch"]',
    'audio[controls]',
    'video[controls]',
].join(',');

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
            open: controlledOpen,
            defaultOpen = false,
            onOpenChange,
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
        const [ownOpen, setOwnOpen] = useState(defaultOpen);
        const open = controlledOpen ?? ownOpen;
        const openedOnce = revealOn === 'click' && revealOnce && open;
        const interactive = revealOn === 'click' && !openedOnce;
        const Container = mode === 'element' ? 'div' : 'span';
        const revealLabel =
            mode === 'element' ? 'Показать скрытое содержимое' : 'Показать скрытый текст';
        const { rootRef, contentRef, anchorRef, canvasRef, ready } = useParticles({
            mode,
            open,
            colors,
        });
        const mergedRef = useMemo(
            () => mergeRefs([rootRef, forwardedRef]),
            [rootRef, forwardedRef],
        );

        useLayoutEffect_SAFE_FOR_SSR(() => {
            // React 16–19 по-разному обрабатывают inert, поэтому устанавливаем атрибут в DOM.
            const content = contentRef.current;

            if (content) {
                content.toggleAttribute('inert', !open);
                content.toggleAttribute('data-native-inert', 'inert' in content);
            }
        }, [open, mode, contentRef]);

        const changeOpen = (nextOpen: boolean) => {
            if (nextOpen === open) return;
            if (controlledOpen === undefined) setOwnOpen(nextOpen);
            onOpenChange?.(nextOpen);
        };
        const toggle = () => {
            if (interactive) changeOpen(!open);
        };
        let tabIndex: number | undefined;

        if (interactive) tabIndex = 0;
        if (openedOnce) tabIndex = -1;

        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            const target = event.target as Element;
            const control = target.closest?.(NESTED_CONTROL);

            if (control && control !== event.currentTarget) return;
            if (open && hasSelectionInside(rootRef.current)) return;
            toggle();
        };
        const canvas = (
            <canvas
                ref={canvasRef}
                className={cn(styles.canvas, colorStyles[colors].canvas)}
                data-spoiler-canvas=''
                aria-hidden='true'
            />
        );

        return (
            // span сохраняет строки; div допускает произвольное блочное содержимое.
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <Container
                {...restProps}
                ref={mergedRef}
                className={cn(
                    styles.component,
                    defaultColors.fallback,
                    invertedColors.fallback,
                    className,
                    {
                        [styles.element]: mode === 'element',
                    },
                )}
                data-ready={ready}
                data-colors={colors}
                data-interactive={interactive}
                data-test-id={dataTestId}
                data-state={open ? 'revealed' : 'hidden'}
                role={interactive ? 'button' : undefined}
                // Ручной режим не добавляет элемент в порядок табуляции.
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={tabIndex}
                aria-expanded={interactive ? open : undefined}
                aria-label={ariaLabel ?? (interactive && !open ? revealLabel : undefined)}
                onClick={composeHandlers(onClick, handleClick)}
                onKeyDown={composeHandlers(onKeyDown, (event) => {
                    if (
                        interactive &&
                        event.target === event.currentTarget &&
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
                    aria-hidden={!open || undefined}
                >
                    {children}
                </Container>
                {mode === 'text' ? (
                    <span
                        ref={anchorRef}
                        className={styles.anchor}
                        data-spoiler-anchor=''
                        aria-hidden='true'
                    >
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
