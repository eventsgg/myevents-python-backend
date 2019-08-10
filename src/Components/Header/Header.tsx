import React from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { inject } from 'mobx-react';

import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { SearchBar } from '../SearchBar/SearchBar';
import { AuthUser } from '../AuthUser/AuthUser';
import { MainMenu } from '../MainMenu/MainMenu';
import { Burger } from '../Burger/Burger';
import { MainDrawer } from '../MainDrawer/MainDrawer';
import { IPageLoadingStore } from '../../Typings';
import './Header.css';

const styles = {
    grow: {
        flexGrow: 1
    },
    headerShim: {
        position: 'static' as 'static'
    }
};

const categories = gql`
    query categories {
        categories {
            id,
            title,
            alias
        }
    }
`;

interface IHeaderProps {
    classes: {
        grow: string;
        headerShim: string;
    }
    pageLoadingStore?: IPageLoadingStore;
}

interface IHeaderState {
    open: boolean;
}

@inject('pageLoadingStore')
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
        const { classes, pageLoadingStore } = this.props;
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
                        <Typography className={classes.grow} color="inherit" variant="h5">
                            <Link href="/">
                                <a className="Header-Link">My Events</a>
                            </Link>
                        </Typography>

                        <SearchBar/>

                        <AuthUser />
                    </Toolbar>
                </AppBar>

                <Toolbar className={this.props.classes.headerShim}/>

                <Query query={categories}>
                    {({ loading, error, data }) => {
                        if (error) {
                            return (<div>error.message</div>);
                        }

                        if (loading) {
                            pageLoadingStore!.loading = true;
                            return (<div></div>);
                        }

                        pageLoadingStore!.loading = false;

                        return (
                            <MainMenu items={data.categories} />
                        );
                    }}
                </Query>
            </>
        )
    }

    renderBurger(clickCallback: () => void) {
        return (<Burger onClick={clickCallback} />);
    }
}

const Header = withStyles(styles)(PureHeader);

export { Header };