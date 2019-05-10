import { observable, computed } from 'mobx';

import { IAuthModalStore } from '../Typings';

class AuthModalStore implements IAuthModalStore {
    @observable private _isOpen: boolean = false;

    set open(isOpen: boolean){
        this._isOpen = isOpen;
    }

    @computed get open(): boolean {
        return this._isOpen;
    }
}

export const authModalStore = new AuthModalStore();