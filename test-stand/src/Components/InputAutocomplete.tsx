import React from 'react';
import {
    InputAutocomplete,
    InputAutocompleteProps,
} from '@alfalab/core-components-input-autocomplete';
import { OptionShape } from '@alfalab/core-components-select';

const options: OptionShape[] = [
    { key: 'Neptunium' },
    { key: 'Plutonium' },
    { key: 'Americium' },
    { key: 'Curium' },
    { key: 'Berkelium' },
    { key: 'Californium' },
    { key: 'Einsteinium' },
    { key: 'Fermium' },
    { key: 'Mendelevium' },
    { key: 'Nobelium' },
    { key: 'Lawrencium' },
    { key: 'Rutherfordium' },
    { key: 'Dubnium' },
    { key: 'Seaborgium' },
    { key: 'Bohrium' },
];

const InputAutocompleteExample = () => {
    const matchOption = (option: OptionShape, inputValue: string) =>
        option.key.toLowerCase().includes((inputValue || '').toLowerCase());

    const [value, setValue] = React.useState('');

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleChange: InputAutocompleteProps['onChange'] = ({ selected }) => {
        setValue(selected ? selected.key : '');
    };

    const filteredOptions = options.filter(option => matchOption(option, value));

    return (
        <InputAutocomplete
            options={filteredOptions}
            placeholder='Введите элемент'
            label='Элемент'
            onChange={handleChange}
            onInput={handleInput}
            value={value}
        />
    );
};

export default InputAutocompleteExample;
