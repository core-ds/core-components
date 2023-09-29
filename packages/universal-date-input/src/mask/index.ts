import { MaskitoMask, MaskitoMaskExpression, MaskitoOptions } from '@maskito/core';

import { TEMPLATES } from '../consts';
import { DateTemplate, View } from '../types';

import { createCaretPosPlugin } from './plugins';
import { createPreventCaretJumpPostprocessor } from './postprocessors';
import { createDisallowInputPreprocessor, createValidationPreprocessor } from './preprocessors';
import { getValueSegments, segmentsToPattern, segmentsToString, shiftSegmentsData } from './utils';

export function createMaskOptions(
    view: View,
    min: Date,
    max: Date,
    autoCorrection: boolean,
    onCorrection: () => void,
): MaskitoOptions {
    const template = TEMPLATES[view];
    const stringTemplate = segmentsToString(template.segments, template.separators);

    return {
        mask: createMaskExpression(template),
        preprocessors: [
            createDisallowInputPreprocessor(),
            ...(autoCorrection
                ? [createValidationPreprocessor(template, stringTemplate, min, max, onCorrection)]
                : []),
        ],
        postprocessors: [createPreventCaretJumpPostprocessor()],
        plugins: [createCaretPosPlugin(template)],
    };
}

function createMaskExpression({
    segments: templateSegments,
    separators,
}: DateTemplate): MaskitoMask {
    return ({ value }): MaskitoMaskExpression => {
        if (value.length < 2) return [/\d/];

        const rawSegments = getValueSegments(value, separators);
        const segments = shiftSegmentsData(rawSegments, templateSegments);

        return segmentsToPattern(segments, separators);
    };
}
