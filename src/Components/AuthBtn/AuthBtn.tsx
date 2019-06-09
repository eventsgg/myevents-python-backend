import React from 'react';
import { inject } from 'mobx-react';
import Button from '@material-ui/core/Button';

import { IAuthStore, IAuthModalStore } from '../../Typings/';

interface IAuthBtnProps {
    authStore?: IAuthStore;
    authModalStore?: IAuthModalStore;
}

@inject('authStore', 'authModalStore')
class AuthBtn extends React.Component<IAuthBtnProps> {
    showAuthModal = () => {
        this.props.authModalStore!.open = true;
    }

    login = () => {
        this.props.authStore!.login({
            name: 'Eli Chernin',
            pic: 'https://yt3.ggpht.com/-jFcPLcG8CG4/AAAAAAAAAAI/AAAAAAAAAAA/MA_M3HqdnFM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg',
        });
    }

    render() {
        return (
            <Button 
                onClick={this.showAuthModal}
                color="inherit" 
                variant="outlined" 
            >
                Войти
            </Button>
        );
    }
}

export { AuthBtn };