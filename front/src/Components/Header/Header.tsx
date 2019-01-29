import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Burger from '../Burger/Burger';
import SearchBar from '../SearchBar/SearchBar';
import AuthBtn from '../AuthBtn/AuthBtn';

interface HeaderProps {
    classes: {
        grow: string
    }
}

class Header extends Component<HeaderProps> {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Burger/>

                    <Typography className={ this.props.classes.grow } color="inherit" variant="headline">
                        Repost me
                    </Typography>

                    <SearchBar/>

                    <AuthBtn/>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles({
    grow: {
        flexGrow: 1
    }
})(Header);