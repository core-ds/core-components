import React, { type FC, forwardRef, type RefAttributes, useCallback, useEffect } from 'react';

import { OptionsList as DefaultOptionsList } from '../../../components/options-list';
import { DEFAULT_VISIBLE_OPTIONS, SELECT_ALL_KEY } from '../../../consts';
import { type OptionShape, type OptionsListProps } from '../../../typings';

import { Footer as DefaultFooter, type FooterProps } from './footer/Component';
import { Header as DefaultHeader, type HeaderProps } from './header/Component';

type OptionsListWithApplyProps = OptionsListProps & {
    showClear?: boolean;
    onClose?: () => void;
    selectedDraft?: OptionShape[];
    OptionsList?: React.FC<OptionsListProps & RefAttributes<HTMLDivElement>>;
    Footer?: FC<FooterProps>;
    Header?: FC<HeaderProps>;
    headerProps?: HeaderProps;
    showHeaderWithSelectAll?: boolean;
    setSelectedDraft?: (selectedDraft: OptionShape[]) => void;
};

export const OptionsListWithApply = forwardRef<HTMLDivElement, OptionsListWithApplyProps>(
    (
        {
            toggleMenu,
            getOptionProps: defaultGetOptionProps,
            showClear = true,
            showHeaderWithSelectAll,
            selectedDraft = [],
            flatOptions = [],
            OptionsList = DefaultOptionsList,
            onApply = () => null,
            onClear = () => null,
            onClose = () => null,
            visibleOptions = DEFAULT_VISIBLE_OPTIONS,
            Footer = DefaultFooter,
            Header = DefaultHeader,
            header,
            headerProps,
            setSelectedDraft,
            size,
            ...restProps
        }: OptionsListWithApplyProps,
        ref,
    ) => {
        const getOptionProps = useCallback(
            (option: OptionShape, index: number) => {
                const optionProps = defaultGetOptionProps(option, index);

                const selected =
                    option.key === SELECT_ALL_KEY
                        ? selectedDraft.length === flatOptions.length - 1
                        : selectedDraft.some(({ key }) => key === option.key);

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

        const handleSelectedItems = useCallback(
            (items: OptionShape[]) => {
                setSelectedDraft?.(items);
            },
            [setSelectedDraft],
        );

        useEffect(() => {
            const activeElement = document.activeElement as HTMLElement;

            return () => {
                onClose();
                if (activeElement) {
                    activeElement.focus();
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const renderHeader = () => {
            if (!showHeaderWithSelectAll && !header) return undefined;

            return (
                <React.Fragment>
                    {header}
                    {showHeaderWithSelectAll && flatOptions.length > 0 && (
                        <Header {...headerProps} size={size} />
                    )}
                </React.Fragment>
            );
        };

        return (
            <OptionsList
                {...restProps}
                size={size}
                ref={ref}
                visibleOptions={visibleOptions}
                toggleMenu={toggleMenu}
                flatOptions={flatOptions}
                getOptionProps={getOptionProps}
                onApply={handleApply}
                onClear={handleClear}
                header={renderHeader()}
                selectedItems={selectedDraft}
                setSelectedItems={handleSelectedItems}
                footer={
                    <Footer
                        handleApply={handleApply}
                        handleClear={handleClear}
                        showClear={showClear}
                        selectedDraft={selectedDraft}
                        dataTestId={restProps?.dataTestId}
                        size={size}
                    />
                }
            />
        );
    },
);
