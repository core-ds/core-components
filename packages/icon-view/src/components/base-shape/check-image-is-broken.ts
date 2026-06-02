type CheckImageIsBrokenParams = {
    imageUrl: string;
    onResolve: (isBroken: boolean) => void;
};

export const checkImageIsBroken = ({ imageUrl, onResolve }: CheckImageIsBrokenParams) => {
    const image = new Image();

    const resolveWithDecode = () => {
        Promise.resolve()
            .then(() => image.decode())
            .then(() => {
                onResolve(false);
            })
            .catch(() => {
                onResolve(true);
            });
    };

    image.onload = () => {
        Promise.resolve()
            .then(() => createImageBitmap(image))
            .then((imageBitmap) => {
                imageBitmap.close();
                onResolve(false);
            })
            .catch(() => {
                resolveWithDecode();
            });
    };

    image.onerror = () => {
        onResolve(true);
    };

    image.src = imageUrl;
};
