import React, {
    forwardRef,
    RefAttributes,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import { Button } from '@alfalab/core-components-button';

import {
    OptionsList as DefaultOptionsList,
    VirtualOptionsList as DefaultVirtualOptionsList,
} from '../../../components';
import { OptionShape, OptionsListProps } from '../../../typings';
import { SELECT_ALL_KEY } from '../hook';

import styles from './index.module.css';

type OptionsListWithApplyProps = OptionsListProps & {
    showClear?: boolean;
    onClose?: () => void;
    selectedDraft?: OptionShape[];
    OptionsList?: React.FC<OptionsListProps & RefAttributes<unknown>>;
    view?: 'mobile' | 'desktop';
};

const VIRTUAL_OPTIONS_LIST_THRESHOLD = 30;

export const OptionsListWithApply = forwardRef(
    (
        {
            toggleMenu,
            getOptionProps: defaultGetOptionProps,
            showClear = true,
            selectedDraft = [],
            flatOptions = [],
            OptionsList = flatOptions.length > VIRTUAL_OPTIONS_LIST_THRESHOLD
                ? DefaultVirtualOptionsList
                : DefaultOptionsList,
            onApply = () => null,
            onClear = () => null,
            onClose = () => null,
            visibleOptions = 5,
            view,
            ...restProps
        }: OptionsListWithApplyProps,
        ref,
    ) => {
        const footerRef = useRef<HTMLDivElement>(null);

        const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);

        const buttonSize = view === 'mobile' ? 's' : 'xxs';

        const getOptionProps = useCallback(
            (option: OptionShape, index: number) => {
                const optionProps = defaultGetOptionProps(option, index);

                const selected =
                    option.key === SELECT_ALL_KEY
                        ? selectedDraft.length === flatOptions.length - 1
                        : selectedDraft.includes(option);

                return {
                    ...optionProps,
                    selected,
                };
            },
            [defaultGetOptionProps, flatOptions.length, selectedDraft],
        );

        const handleApply = useCallback(() => {
            onApply();

            toggleMenu();
        }, [onApply, toggleMenu]);

        const handleClear = useCallback(() => {
            onClear();

            toggleMenu();
        }, [onClear, toggleMenu]);

        useEffect(() => {
            const activeElement = document.activeElement as HTMLElement;

            setTimeout(() => {
                if (footerRef.current) {
                    footerRef.current.focus();
                }
            }, 0);

            return () => {
                onClose();
                if (activeElement) {
                    activeElement.focus();
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useEffect(() => {
            setHasFooter(true);
        }, [setHasFooter]);

        return (
            <OptionsList
                {...restProps}
                ref={ref}
                visibleOptions={visibleOptions}
                toggleMenu={toggleMenu}
                flatOptions={flatOptions}
                getOptionProps={getOptionProps}
                onApply={handleApply}
                onClear={handleClear}
                footer={
                    <div
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                        tabIndex={0}
                        className={
                            view === 'mobile'
                                ? cn(styles.footerMobile, {
                                      [styles.highlighted]: footerHighlighted,
                                  })
                                : styles.footer
                        }
                        ref={footerRef}
                    >
                        <Button
                            size={buttonSize}
                            view='primary'
                            onClick={handleApply}
                            className={view === 'mobile' ? styles.footerButtonMobile : undefined}
                        >
                            Применить
                        </Button>

                        {showClear && (
                            <Button
                                size={buttonSize}
                                view='secondary'
                                onClick={handleClear}
                                className={
                                    view === 'mobile' ? styles.footerButtonMobile : undefined
                                }
                            >
                                Сбросить
                            </Button>
                        )}
                    </div>
                }
            />
        );
    },
);
