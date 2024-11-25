export function getDefaultWeight(font: 'styrene' | 'system', platform: 'mobile' | 'desktop') {
    if (font === 'styrene') {
        return 'medium';
    }

    if (platform === 'desktop') {
        return 'bold';
    }

    return 'semibold';
}
