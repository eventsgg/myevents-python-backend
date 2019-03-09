import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { SearchBar } from '../SearchBar/SearchBar';
import { AuthUser } from '../AuthUser/AuthUser';
import { MainMenu } from '../MainMenu/MainMenu';
import mainMenuData from './MainMenuData.json';
import './Header.scss';

const styles = {
    grow: {
        flexGrow: 1
    },
    headerShim: {
        position: 'static' as 'static'
    }
};

interface IHeaderProps {
    classes: {
        grow: string;
        headerShim: string;
    }
}

class PureHeader extends Component<IHeaderProps> {
    render() {
        return (
            <>
                <AppBar>
                    <Toolbar>
                        <Typography className={this.props.classes.grow} color="inherit" variant="headline">
                            <Link className="Header-Link" to="/">My events</Link>
                        </Typography>

                        <SearchBar/>

                        <AuthUser />
                    </Toolbar>
                </AppBar>

                <Toolbar className={this.props.classes.headerShim}/>

                <MainMenu items={mainMenuData.main_menu}/>
            </>
        )
    }
}

const Header = withStyles(styles)(PureHeader);

export { Header };