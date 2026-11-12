import React, { forwardRef, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useFocus, useId, useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

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
            expandOnHover = true,
            repelParticlesOnHover = true,
            colors = 'default',
            className,
            dataTestId,
            onClick,
            onKeyDown,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            ...restProps
        },
        forwardedRef,
    ) => {
        const [ownOpen, setOwnOpen] = useState(defaultOpen);
        const open = controlledOpen ?? ownOpen;
        const openedOnce = revealOn === 'click' && revealOnce && open;
        const interactive = revealOn === 'click' && !openedOnce;
        const triggerRef = useRef<HTMLButtonElement>(null);
        const [focused] = useFocus(triggerRef, 'keyboard');
        const contentId = useId();
        const Container = mode === 'element' ? 'div' : 'span';
        const revealLabel =
            mode === 'element' ? 'Показать скрытое содержимое' : 'Показать скрытый текст';
        const { rootRef, contentRef, anchorRef, canvasRef, ready } = useParticles({
            mode,
            open,
            colors,
            expandOnHover,
            repelParticlesOnHover,
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
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            const target = event.target as Element;
            const control = target.closest?.(NESTED_CONTROL);

            if (control && control !== triggerRef.current) return;
            if (open && control !== triggerRef.current && hasSelectionInside(contentRef.current))
                return;
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
                data-focused={focused}
                data-test-id={dataTestId}
                data-state={open ? 'revealed' : 'hidden'}
                role={undefined}
                tabIndex={undefined}
                aria-label={revealOn === 'manual' ? ariaLabel : undefined}
                onClick={composeHandlers(onClick, handleClick)}
                onKeyDown={composeHandlers(onKeyDown, (event) => {
                    if (
                        event.target === triggerRef.current &&
                        event.repeat &&
                        (event.key === 'Enter' || event.key === ' ')
                    ) {
                        event.preventDefault();
                    }
                })}
            >
                <button
                    ref={triggerRef}
                    type='button'
                    className={styles.trigger}
                    data-spoiler-trigger=''
                    hidden={revealOn === 'manual'}
                    tabIndex={interactive ? 0 : -1}
                    aria-expanded={open}
                    aria-controls={contentId}
                    aria-disabled={openedOnce || undefined}
                    aria-label={ariaLabel ?? (open ? 'Скрыть содержимое' : revealLabel)}
                    aria-labelledby={ariaLabelledBy}
                />
                <Container
                    // Container и фактический узел совпадают; div-ref совместим и со span.
                    ref={contentRef as React.RefObject<HTMLDivElement>}
                    id={contentId}
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
