const ADDITIONAL_OFFSET = 15;

function getTabs(container: HTMLDivElement) {
    return Array.from(container.querySelectorAll<HTMLButtonElement>('button[role="tab"]'));
}

function findLastVisibleTab(container: HTMLDivElement) {
    const tabs = getTabs(container);

    return tabs.reduce((res, tab) => {
        if (tab.offsetLeft + ADDITIONAL_OFFSET < container.clientWidth + container.scrollLeft) {
            return tab;
        }

        return res;
    }, tabs[0]);
}

function findFirstVisibleTab(container: HTMLDivElement) {
    const tabs = getTabs(container);

    return tabs.reduceRight(
        (res, tab) => {
            if (tab.offsetLeft + tab.clientWidth > container.scrollLeft + ADDITIONAL_OFFSET) {
                return tab;
            }

            return res;
        },
        tabs[tabs.length - 1],
    );
}

export function scrollIntoLastTab(container: HTMLDivElement | null) {
    if (!container) return;

    findLastVisibleTab(container).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
    });
}

export function scrollIntoFirstTab(container: HTMLDivElement | null) {
    if (!container) return;

    findFirstVisibleTab(container).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
    });
}

export function getDisabledState(container: HTMLDivElement | null) {
    if (!container) return { toLeft: false, toRight: false };
    const scrollOffset = 2;

    const toLeft = container.scrollLeft <= scrollOffset;
    const toRight =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - scrollOffset;

    return { toLeft, toRight };
}
