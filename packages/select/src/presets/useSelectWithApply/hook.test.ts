import { act, renderHook } from '@testing-library/react';

import { type OptionShape } from '../../typings';

import { useSelectWithApply } from './hook';

const options: OptionShape[] = [
    { key: '1', content: 'Auurum' },
    { key: '2', content: 'Bercelium' },
    { key: '3', content: 'Curium', disabled: true },
    { key: '4', content: 'Neptunium' },
];

const enabledOptions = [options[0], options[1], options[3]];
const disabledOption = options[2];

describe('useSelectWithApply', () => {
    describe('disabled options', () => {
        it('selects only enabled options on "Select all" click', () => {
            const onSelectAllClick = jest.fn();

            const { result } = renderHook(() =>
                useSelectWithApply({
                    options,
                    selected: [],
                    onChange: jest.fn(),
                    onSelectAllClick,
                    showHeaderWithSelectAll: true,
                }),
            );

            act(() => {
                result.current.optionsListProps.headerProps?.onChange?.();
            });

            expect(onSelectAllClick).toHaveBeenCalledWith(enabledOptions);
            expect(result.current.optionsListProps.selectedDraft).toEqual(enabledOptions);
            expect(result.current.optionsListProps.selectedDraft).not.toContainEqual(
                disabledOption,
            );
            expect(result.current.optionsListProps.headerProps?.checked).toBe(true);
            expect(result.current.optionsListProps.headerProps?.indeterminate).toBe(false);
        });

        it('does not pass disabled options to onChange on "Apply"', () => {
            const onChange = jest.fn();

            const { result } = renderHook(() =>
                useSelectWithApply({
                    options,
                    selected: [disabledOption],
                    onChange,
                    showHeaderWithSelectAll: true,
                }),
            );

            expect(result.current.optionsListProps.selectedDraft).toEqual([]);

            act(() => {
                result.current.optionsListProps.onApply?.();
            });

            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    selected: undefined,
                    selectedMultiple: [],
                    name: 'apply-footer',
                }),
            );
        });

        it('shows indeterminate state when only some selectable options are selected', () => {
            const { result } = renderHook(() =>
                useSelectWithApply({
                    options,
                    selected: [options[0]],
                    onChange: jest.fn(),
                    showHeaderWithSelectAll: true,
                }),
            );

            expect(result.current.optionsListProps.headerProps?.checked).toBe(false);
            expect(result.current.optionsListProps.headerProps?.indeterminate).toBe(true);
        });

        it('does not add disabled option to selection draft', () => {
            const { result } = renderHook(() =>
                useSelectWithApply({
                    options,
                    selected: [],
                    onChange: jest.fn(),
                    showHeaderWithSelectAll: true,
                }),
            );

            act(() => {
                result.current.onChange({
                    selected: disabledOption,
                    selectedMultiple: [disabledOption],
                    initiator: disabledOption,
                });
            });

            expect(result.current.optionsListProps.selectedDraft).toEqual([]);
        });
    });
});
