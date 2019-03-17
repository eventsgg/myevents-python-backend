import React from 'react';
import { NavLink } from 'react-router-dom';
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
}

interface IMainMenuProps {
    items: IMenuItem[];
    classes: {
        listRoot: string;
        ListItemRoot: string;
        linkRoot: string;
        activeLinkRoot: string;
    }
}

class MainMenuPresenter extends React.Component<IMainMenuProps> {
    renderLink = (id, linkProps) => {
        const { classes } = this.props;

        return (
            <NavLink
                activeClassName={classes.activeLinkRoot}
                className={classes.linkRoot}
                to={`/category/${id}`}
                { ...linkProps }
            />
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <List classes={{root: classes.listRoot}}>
                {
                    this.props.items.map((item, i) => (
                        <ListItem 
                            component={this.renderLink.bind(this, item.id)}
                            classes={{ root: classes.ListItemRoot }}
                            divider={true}
                            button
                            key={i}
                        >
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))
                }
            </List>
        );

    }
}

const MainMenu = withStyles(styles)(MainMenuPresenter);

export { MainMenu };