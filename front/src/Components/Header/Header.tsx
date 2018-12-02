import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Burger from '../Burger/Burger';
import AuthBtn from '../AuthBtn/AuthBtn';
import styles from './Header.module.scss';

class Header extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Burger/>

                    <Typography className={styles.title} color="inherit" variant="headline">
                        Repost me
                    </Typography>

                    <AuthBtn/>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;