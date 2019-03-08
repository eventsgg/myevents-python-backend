export interface IShareModalStore {
    open: boolean;
}

export interface IuserData {
    name?: string;
    pic?: string;
}

export interface IAuthStore {
    login: (userData: IuserData) => void;
    logout: () => void;
    isAuthorized: () => boolean;
    userData: IuserData
}