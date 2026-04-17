type CheckImageIsBrokenParams = {
    imageUrl: string;
    onResolve: (isBroken: boolean) => void;
};

export const checkImageIsBroken = ({ imageUrl, onResolve }: CheckImageIsBrokenParams) => {
    const image = new Image();

    const resolveWithDecode = () => {
        if (typeof image.decode === 'function') {
            image
                .decode()
                .then(() => {
                    onResolve(false);
                })
                .catch(() => {
                    onResolve(true);
                });

            return;
        }

        onResolve(false);
    };

    image.onload = () => {
        if (typeof createImageBitmap === 'function') {
            createImageBitmap(image)
                .then((imageBitmap) => {
                    imageBitmap.close();
                    onResolve(false);
                })
                .catch(() => {
                    resolveWithDecode();
                });

            return;
        }

        resolveWithDecode();
    };

    image.onerror = () => {
        onResolve(true);
    };

    image.src = imageUrl;
};
