import { GlobalStore } from './GlobalStore';
import { ModalStore, SavedStyle } from './ModalStore';

export type { SavedStyle };

const getCoreComponentsStore = (): GlobalStore => {
    if (!window.coreComponentsStore) {
        window.coreComponentsStore = new GlobalStore();

        return window.coreComponentsStore;
    }

    return window.coreComponentsStore;
};

export const getModalStore = (): ModalStore => getCoreComponentsStore().getModalStore();
