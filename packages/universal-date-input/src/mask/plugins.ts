import { type KeyboardEvent } from 'react';
import { type MaskitoPlugin } from '@maskito/core';

import { type DateTemplate } from '../types';

import { findCursorPlace, getValueSegments } from './utils';

export function createCaretPosPlugin(template: DateTemplate): MaskitoPlugin {
    return (element) => {
        const handleKeyDown = (evt: unknown) => {
            const event = evt as KeyboardEvent<HTMLInputElement>;
            const { selectionStart, selectionEnd, value } = element;

            if ([' ', '.'].includes(event.key) && selectionStart === selectionEnd) {
                const nextPos = findNextSegmentPos(value, template, selectionStart || 0);

                element.setSelectionRange(nextPos, nextPos);
            }
        };

        element.addEventListener('keydown', handleKeyDown);

        return () => element.removeEventListener('keydown', handleKeyDown);
    };
}

function findNextSegmentPos(value: string, template: DateTemplate, cursorPos: number) {
    const segments = getValueSegments(value, template.separators);
    const selection = [cursorPos, cursorPos] as const;

    const currCursorPlace = findCursorPlace(
        segments,
        template.segments,
        template.separators,
        selection,
    );

    if (currCursorPlace) {
        let nextCursorPos = 0;

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const separatorLen = template.separators[i]?.length || 0;

            if (i === currCursorPlace.segmentIdx) {
                nextCursorPos += segment.length + separatorLen;

                return nextCursorPos;
            }

            nextCursorPos += segment.length + separatorLen;
        }
    }

    return cursorPos;
}
