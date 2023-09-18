/* eslint-disable no-plusplus, no-param-reassign */
import type { MaskitoPlugin } from '@maskito/core';
import { MaskitoPostprocessor, MaskitoPreprocessor } from '@maskito/core';

import { fnUtils } from './fnUtils';

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

const countDigits = (value: string): number => value.replace(/\D/g, '').length;

/**
 * Препроцессор необходим для правильной вставки/автокомплита телефонного номера
 */
function insertionPhonePreprocessor(
    mask: Array<string | RegExp>,
    countryCode = '',
    clearableCountryCode?: boolean,
): MaskitoPreprocessor {
    const completePhoneLength = mask.filter(
        (item) => `${item}` === `${/\d/}` || /[0-9]/.test(`${item}`),
    ).length;

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

export const maskUtils = {
    insertionPhonePreprocessor,
    prefixPostprocessor,
    caretGuard,
};
