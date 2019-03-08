import React from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { AuthBtn } from '../AuthBtn/AuthBtn';
import { AuthIcon } from '../AuthIcon/AuthIcon';
import { IAuthStore } from '../../Typings/';

const styles = {
    root: {
        minWidth: '90px',
        textAlign: 'center' as 'center',
    }
}

interface IAuthUserProps {
    authStore?: IAuthStore;
    classes: {
        root: string;
    }
}

@inject('authStore')
@observer class AuthUserPresenter extends React.Component<IAuthUserProps> {
    render() {
        const { authStore, classes } = this.props;
        const isAuthorized = authStore!.isAuthorized();

        return (
            <div className={classes.root}>
                {isAuthorized ? (<AuthIcon />) : (<AuthBtn />)}
            </div>
        );
    }
}

export const AuthUser = withStyles(styles)(AuthUserPresenter);