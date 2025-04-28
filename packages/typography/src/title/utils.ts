export function getDefaultWeight(
    font: 'styrene' | 'system' | 'alfasans',
    platform: 'mobile' | 'desktop',
) {
    if (font === 'styrene' || font === 'alfasans') {
        return 'medium';
    }

    if (platform === 'desktop') {
        return 'bold';
    }

    return 'semibold';
}
