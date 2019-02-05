import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface IMenuItem { 
    title: string; 
    url: string; 
}

interface IMainMenuProps {
    items: IMenuItem[];
    classes: any
}

class PureMainMenu extends Component<IMainMenuProps> {
    render() {
        return (
            <List classes={{ root: this.props.classes.listRoot }}>
                {
                    this.props.items.map((item, i) => (
                        <ListItem divider={true} button key={i}>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))
                }
            </List>
        );

    }
}

const MainMenu = withStyles(theme => ({
    listRoot: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            overflowX: 'scroll'
        }
    }
}))(PureMainMenu);

export { MainMenu };