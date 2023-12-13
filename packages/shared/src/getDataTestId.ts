function getDataTestId(dataTestId: string, element: string): string;
function getDataTestId(dataTestId?: string, element?: string): string | undefined;
function getDataTestId(dataTestId?: string, element?: string) {
    const elementPart = element ? `-${element.toLowerCase()}` : '';

    return dataTestId ? `${dataTestId}${elementPart}` : undefined;
}

export { getDataTestId };
