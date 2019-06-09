import React from 'react';
import { inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Avatar from '@material-ui/core/Avatar';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { IAuthStore } from '../../Typings/';

const styles = {
    btn: {
        backgroundColor: 'transparent',
    },
};

interface IAuthIconProps {
    authStore?: IAuthStore;
    classes: {
        btn: string;
    }
}

interface IAuthIconState {
    open: boolean;
}

@inject('authStore')
class AuthIconPresenter extends React.PureComponent<IAuthIconProps, IAuthIconState> {
    protected anchorEl;

    constructor(props: IAuthIconProps) {
        super(props);

        this.state = {
            open: false,
        }
    }

    protected toggleMenu = () => {
        this.setState(state => ({ open: !state.open }));
    }

    protected closeMenu = (e) => {
        if (this.anchorEl.contains(e.target)) {
            return;
        }

        this.setState({ open: false });
    }

    protected logOut = () => {
        this.setState({ open: false }, () => {
            this.props.authStore!.logout();
        });
    }

    render() {
        const { open } = this.state;
        const { authStore, classes } = this.props;

        return (
            <>
                <Button
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    className={classes.btn}
                    style={styles.btn}
                    onClick={this.toggleMenu}
                    disableRipple
                    disableTouchRipple

                >
                    <Avatar src={authStore!.userData.pic} />
                </Button>
                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.closeMenu}>
                                    <MenuList>
                                        <MenuItem onClick={this.logOut}>Выйти</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </>
        );

    }
}

const AuthIcon = withStyles(styles)(AuthIconPresenter);

export { AuthIcon };