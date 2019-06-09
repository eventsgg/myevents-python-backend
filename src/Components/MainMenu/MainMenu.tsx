import React from 'react';
import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => ({
    listRoot: {
        display: 'flex',
        paddingTop: 0,
        [theme.breakpoints.down('xs')]: {
            overflowX: 'scroll' as 'scroll'
        }
    },
    ListItemRoot: {
        textAlign: 'center' as 'center',
        '&:focus': {
            backgroundColor: 'initial'
        }
    },
    linkRoot: {
        width: '100%',
        textDecoration: 'none'
    },
    activeLinkRoot: {
        backgroundColor: theme.palette.action.hover
    }
});

interface IMenuItem { 
    title: string;
    id: string;
    alias: string;
}

interface IMainMenuProps extends WithRouterProps {
    items: IMenuItem[];
    classes: {
        listRoot: string;
        ListItemRoot: string;
        linkRoot: string;
        activeLinkRoot: string;
    };
}

class MainMenuPresenter extends React.Component<IMainMenuProps> {
    render() {
        const { classes, router } = this.props;

        return (
            <List classes={{root: classes.listRoot}}>
                {
                    this.props.items.map((item, i) => {
                        const href = `/?category=${item.id}`;
                        let isActiveLink = false;

                        if (router) {
                            isActiveLink = href === router.asPath;
                        }

                        return (
                            <Link href={href} key={i} >
                                <ListItem
                                    classes={{ root: classes.ListItemRoot }}
                                    className={(isActiveLink ? classes.activeLinkRoot : '')}
                                    divider={true}
                                    button
                                    key={item.id}
                                >
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            </Link>
                        );
                    })
                }
            </List>
        );

    }
}

const MainMenu = withRouter(withStyles(styles)(MainMenuPresenter));

export { MainMenu };