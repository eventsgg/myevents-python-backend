import React from 'react';
import { inject } from 'mobx-react';
import Button from '@material-ui/core/Button';

import { IAuthStore } from '../../Typings/';

interface IAuthBtnProps {
    authStore?: IAuthStore
}

@inject('authStore')
class AuthBtn extends React.Component<IAuthBtnProps> {
    login = () => {
        this.props.authStore!.login({
            name: 'Eli Chernin',
            pic: 'https://yt3.ggpht.com/-jFcPLcG8CG4/AAAAAAAAAAI/AAAAAAAAAAA/MA_M3HqdnFM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg',
        });
        
    }

    render() {
        return (
            <Button 
                onClick={this.login} 
                color="inherit" 
                variant="outlined" 
            >
                Войти
            </Button>
        );
    }
}

export { AuthBtn };