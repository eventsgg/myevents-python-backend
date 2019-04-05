import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { SearchBar } from '../SearchBar/SearchBar';
import { AuthUser } from '../AuthUser/AuthUser';
import { MainMenu } from '../MainMenu/MainMenu';
import { Burger } from '../Burger/Burger';
import { MainDrawer } from '../MainDrawer/MainDrawer';
import mainMenuData from './MainMenuData.json';
import './Header.css';

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

interface IHeaderState {
    open: boolean;
}

class PureHeader extends React.PureComponent<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);

        this.state ={
            open: false,
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.hideDrawer = this.hideDrawer.bind(this);
    }

    showDrawer() {
        this.setState({ open: true });
    }

    hideDrawer() {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <>
                <AppBar>
                    <Toolbar>
                        {this.renderBurger(this.showDrawer)}
                        <MainDrawer
                            open={open}
                            onOutsideClick={this.hideDrawer}
                            onMenuClick={this.hideDrawer}
                        >
                            {this.renderBurger(this.hideDrawer)}
                        </MainDrawer>
                        <Typography className={classes.grow} color="inherit" variant="headline">
                            <Link className="Header-Link" to="/">My Events</Link>
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

    renderBurger(clickCallback: () => void) {
        return (<Burger onClick={clickCallback} />);
    }
}

const Header = withStyles(styles)(PureHeader);

export { Header };