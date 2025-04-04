/* eslint-disable no-plusplus, no-param-reassign */
import { RefObject } from 'react';
import { Country } from '@balafla/core-components-types';
import type { MaskitoPlugin } from '@maskito/core';
import { MaskitoPostprocessor, MaskitoPreprocessor } from '@maskito/core';

import { fnUtils, isNonNullable } from './fnUtils';

/**
 *  Запрещает каретке становиться за указанные границы
 */
function caretGuard(
    guard: (
        value: string,
        selection: readonly [from: number, to: number],
    ) => [from: number, to: number],
): MaskitoPlugin {
    return (element) => {
        const document = element.ownerDocument;
        let isPointerDown = 0;
        const onPointerDown = () => isPointerDown++;

        const onPointerUp = (): void => {
            isPointerDown = Math.max(--isPointerDown, 0);
        };

        const listener = (): void => {
            if (document.activeElement !== element) {
                return;
            }

            if (isPointerDown) {
                document.addEventListener('mouseup', listener, {
                    once: true,
                    passive: true,
                });

                return;
            }

            const start = element.selectionStart || 0;
            const end = element.selectionEnd || 0;
            const [fromLimit, toLimit] = guard(element.value, [start, end]);

            if (fromLimit > start || toLimit < end) {
                element.setSelectionRange(
                    fnUtils.clamp(start, fromLimit, toLimit),
                    fnUtils.clamp(end, fromLimit, toLimit),
                );
            }
        };

        document.addEventListener('selectionchange', listener, { passive: true });
        element.addEventListener('mousedown', onPointerDown, { passive: true });
        document.addEventListener('mouseup', onPointerUp, { passive: true });

        return () => {
            document.removeEventListener('selectionchange', listener);
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('mouseup', onPointerUp);
        };
    };
}

/**
 *  Запрещает удалять указанный префикс
 */
function prefixPostprocessor(prefix: string): MaskitoPostprocessor {
    return prefix
        ? ({ value, selection }, initialElementState) => {
              if (
                  value.startsWith(prefix) ||
                  (!value && !initialElementState.value.startsWith(prefix))
              ) {
                  return { value, selection };
              }

              const [from, to] = selection;
              const requiredPrefix = Array.from(prefix).reduce((computedPrefix, char, i) => {
                  const newValue = computedPrefix + value;

                  return newValue[i] === char ? computedPrefix : computedPrefix + char;
              }, '');

              return {
                  selection: [from + requiredPrefix.length, to + requiredPrefix.length],
                  value: requiredPrefix + value,
              };
          }
        : (state) => state;
}

const clearMask = (value: string) => value.replace(/\D/g, '');

const countDigits = (value: string): number => clearMask(value).length;

const getCompletePhoneLength = (mask: Array<string | RegExp>) =>
    mask.filter((item) => `${item}` === `${/\d/}` || /[0-9]/.test(`${item}`)).length;

/**
 * Препроцессор необходим для правильной вставки/автокомплита телефонного номера
 */
function insertionPhonePreprocessor(
    mask: Array<string | RegExp>,
    countryCode: string | undefined,
    clearableCountryCode: boolean | undefined,
): MaskitoPreprocessor {
    const completePhoneLength = getCompletePhoneLength(mask);

    const trimCountryPrefix = (value: string): string => {
        if (countryCode === '7') {
            return value.replace(/^(\+?7?\s?8?)\s?/, '');
        }

        return value.replace(new RegExp(`^(\\+?${countryCode}?)\\s?`), '');
    };

    return ({ elementState, data }) => {
        const { value, selection } = elementState;
        const valueDigitsCount = countDigits(value);
        let nextData;

        if (clearableCountryCode) {
            const fullNumberSelected = value.replace('+', '').length <= selection[1] - selection[0];

            if (valueDigitsCount > 0 && !fullNumberSelected) {
                nextData =
                    countDigits(data) >= completePhoneLength ? trimCountryPrefix(data) : data;
            } else {
                nextData = countDigits(data) > completePhoneLength ? trimCountryPrefix(data) : data;
            }
        } else {
            nextData = countDigits(data) >= completePhoneLength ? trimCountryPrefix(data) : data;
        }

        return {
            data: nextData,
            elementState: {
                selection,
                value: valueDigitsCount > completePhoneLength ? trimCountryPrefix(value) : value,
            },
        };
    };
}

/**
 * Препроцессор необходим для сохранения кода страны при автозаполнении
 */
function preserveCountryCodePreprocessor(
    countryRef: RefObject<Country | null>,
    createMask: (country: Country) => Array<string | RegExp>,
): MaskitoPreprocessor {
    return ({ elementState }) => {
        const { value, selection } = elementState;
        const country = countryRef.current;

        if (!value.startsWith('+') && isNonNullable(country)) {
            const { countryCode } = country;
            const numbersValue = clearMask(value);

            if (!numbersValue.startsWith(countryCode)) {
                const nextValue = countryCode.concat(numbersValue);
                const mask = createMask(country);

                if (countDigits(nextValue) === getCompletePhoneLength(mask)) {
                    return {
                        elementState: {
                            selection,
                            value: nextValue,
                        },
                    };
                }
            }
        }

        return { elementState };
    };
}

export const maskUtils = {
    insertionPhonePreprocessor,
    prefixPostprocessor,
    caretGuard,
    preserveCountryCodePreprocessor,
};
