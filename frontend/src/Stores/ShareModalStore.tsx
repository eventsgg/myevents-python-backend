import { observable } from 'mobx';

class ShareModalStore {
    @observable private _isOpen = false;

    set open(isOpen: boolean){
        this._isOpen = isOpen;
    }

    get open(): boolean {
        return this._isOpen;
    }
}

export default ShareModalStore;