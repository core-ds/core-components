import { useEffect, useRef, useState } from 'react';

export const useComponent = (error?: string) => {
    const [errorToastOpen, setErrorToastOpen] = useState<boolean>(false);
    const inputProgressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setErrorToastOpen(Boolean(error));
    }, [error]);

    return { errorToastOpen, inputProgressRef, setErrorToastOpen };
};
