import React, { FC } from 'react';

import { Radio } from '@balafla/core-components-radio';
import { RadioGroup } from '@balafla/core-components-radio-group';
import { Space } from '@balafla/core-components-space';
import { Typography } from '@balafla/core-components-typography';
import { Question, Answers } from '../types';

export type QuestionsProps = {
    config?: Question[];
    answers: Answers;
    onChange?: (answers: Answers, question: Question['name']) => void;
};

export const Questions: FC<QuestionsProps> = ({ config = [], answers, onChange = () => {} }) => {
    const handleChange = (name: Question['name'], payload?: { value: string }) => {
        onChange(
            {
                ...answers,
                [name]: payload?.value,
            },
            name,
        );
    };

    return (
        <Space>
            {config.map((question) => (
                <RadioGroup
                    key={question.name}
                    label={<Typography.Text weight='bold'>{question.title}</Typography.Text>}
                    direction='horizontal'
                    name={question.name}
                    onChange={(_, payload) => handleChange(question.name, payload)}
                    value={answers[question.name]}
                >
                    {question.variants.map((variant) => (
                        <Radio {...variant} key={variant.value} align='center' />
                    ))}
                </RadioGroup>
            ))}
        </Space>
    );
};
