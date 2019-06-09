import { observable, computed } from 'mobx';

import { IPageLoadingStore } from '../Typings/';

class PageLoadingStore implements IPageLoadingStore {
    @observable private _isLoading: boolean = false;

    set loading(isLoading: boolean){
        this._isLoading = isLoading;
    }

    @computed get loading() {
        return this._isLoading;
    }
}

export const pageLoadingStore = new PageLoadingStore();