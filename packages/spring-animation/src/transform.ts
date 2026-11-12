const transformPropOrder = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
];

const translateAlias: Record<string, string> = {
    x: 'translateX',
    y: 'translateY',
    z: 'translateZ',
    transformPerspective: 'perspective',
};

export const transformProps = new Set([...transformPropOrder, 'pathRotation']);

const getUnit = (key: string) => {
    if (key.startsWith('scale')) {
        return '';
    }

    return key.startsWith('rotate') || key.startsWith('skew') ? 'deg' : 'px';
};

export const buildTransform = (latest: Record<string, number>) => {
    const transforms = transformPropOrder
        .filter(
            (key) => latest[key] !== undefined && latest[key] !== (key.startsWith('scale') ? 1 : 0),
        )
        .map((key) => `${translateAlias[key] ?? key}(${latest[key]}${getUnit(key)})`);

    if (latest.pathRotation) {
        transforms.push(`rotate(${latest.pathRotation}deg)`);
    }

    return transforms.join(' ') || 'none';
};
