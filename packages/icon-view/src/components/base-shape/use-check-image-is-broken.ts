import { useEffect, useState } from 'react';

import { checkImageIsBroken } from './check-image-is-broken';

type UseCheckImageIsBrokenParams = {
    imageUrl?: string;
    onImageBrokenChange?: (isBrokenImage: boolean) => void;
};

export const useCheckImageIsBroken = ({
    imageUrl,
    onImageBrokenChange,
}: UseCheckImageIsBrokenParams) => {
    const [isBrokenImage, setIsBrokenImage] = useState(false);

    useEffect(() => {
        let isActive = true;

        setIsBrokenImage(false);
        onImageBrokenChange?.(false);

        if (!imageUrl) {
            return () => {
                isActive = false;
            };
        }

        checkImageIsBroken({
            imageUrl,
            onResolve: (isBroken) => {
                if (!isActive) {
                    return;
                }

                setIsBrokenImage(isBroken);
                onImageBrokenChange?.(isBroken);
            },
        });

        return () => {
            isActive = false;
        };
    }, [imageUrl, onImageBrokenChange]);

    return isBrokenImage;
};
