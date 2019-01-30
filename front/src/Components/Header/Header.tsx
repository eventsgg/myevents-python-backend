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
        grow: string;
        headerShim: string;
    }
}

class Header extends Component<HeaderProps> {
    render() {
        return (
            <>
                <AppBar>
                    <Toolbar>
                        <Burger/>

                        <Typography className={ this.props.classes.grow } color="inherit" variant="headline">
                            My events
                        </Typography>

                        <SearchBar/>

                        <AuthBtn/>
                    </Toolbar>
                </AppBar>

                <Toolbar className={ this.props.classes.headerShim }/>
            </>
        )
    }
}

export default withStyles({
    grow: {
        flexGrow: 1
    },
    headerShim: {
        position: 'static'
    }
})(Header);