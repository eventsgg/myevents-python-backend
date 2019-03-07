import { observable, computed } from 'mobx';

export interface IShareModalStore {
    open: boolean;
}

class ShareModalStore implements IShareModalStore {
    @observable private _isOpen: boolean = false;

    set open(isOpen: boolean){
        this._isOpen = isOpen;
    }

    @computed get open(): boolean {
        return this._isOpen;
    }
}

export const shareModalStore = new ShareModalStore();