/*
 * Country model:
 * [
 *    Country name,
 *    Regions,
 *    iso2 code,
 *    International dial code,
 *    Format (if available),
 *    Order priority (if >1 country with same dial code),
 *    Area codes (if >1 country with same dial code)
 * ]
 *
 * Regions:
 * ['america', 'europe', 'asia', 'oceania', 'africa']
 *
 * Sub-regions:
 * ['north-america', 'south-america', 'central-america', 'carribean',
 *  'eu-union', 'ex-ussr', 'ex-yugos', 'baltic', 'middle-east', 'north-africa']
 */

export type TCountriesData = [string, string[], string, string, string?, number?, string[]?];

export const countriesDataExUssr: TCountriesData[] = [
    // ['Абхазия', ['asia', 'ex-ussr'], 'ge-ab', '7840', '... ... .. ..'],
    ['Армения', ['asia', 'ex-ussr'], 'am', '374', '.. ......'],
    ['Азербайджан', ['asia', 'ex-ussr'], 'az', '994', '.. ... .. ..'],
    ['Беларусь', ['europe', 'ex-ussr'], 'by', '375', '.. ... .. ..'],
    ['Грузия', ['asia', 'ex-ussr'], 'ge', '995'],
    ['Казахстан', ['asia', 'ex-ussr'], 'kz', '7', '... ... .. ..', 1, ['6', '7']],
    ['Киргизия', ['asia', 'ex-ussr'], 'kg', '996', '... ... ...'],
    ['Латвия', ['europe', 'eu-union', 'ex-ussr', 'baltic'], 'lv', '371', '.. ... ...'],
    ['Литва', ['europe', 'eu-union', 'ex-ussr', 'baltic'], 'lt', '370'],
    ['Молдавия', ['europe', 'ex-ussr'], 'md', '373', '.. .. .. ..'],
    ['Россия', ['europe', 'asia', 'ex-ussr', 'baltic'], 'ru', '7', '... ... .. ..', 0],
    ['Таджикистан', ['asia', 'ex-ussr'], 'tj', '992'],
    ['Туркменистан', ['asia', 'ex-ussr'], 'tm', '993'],
    ['Украина', ['europe', 'ex-ussr'], 'ua', '380', '.. ... .. ..'],
    ['Узбекистан', ['asia', 'ex-ussr'], 'uz', '998', '.. ... .. ..'],
    ['Эстония', ['europe', 'eu-union', 'ex-ussr', 'baltic'], 'ee', '372', '.... ......'],
]
