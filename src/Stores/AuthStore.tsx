import { observable, action, computed } from 'mobx';

import { IuserData, IAuthStore } from '../Typings/';

class AuthStore implements IAuthStore {
    @observable private _userData: IuserData = {};

    @action login(userData: IuserData) {
        this.userData = userData;
    }

    @action logout() {
        this._userData = {};
    }

    isAuthorized() {
        return Boolean(this._userData.name);
    }

    @computed get userData() {
        return this._userData;
    }

    set userData(userData: IuserData) {
        this._userData = userData;
    }
}

export const authStore = new AuthStore();