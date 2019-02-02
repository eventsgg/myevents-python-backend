import React, { Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface MenuItem { 
    title: string; 
    url: string; 
}

interface MainMenuProps {
    items: MenuItem[];
    classes: {
        listRoot: string;
    }
}

class MainMenu extends Component<MainMenuProps> {
    render() {
        return (
            <List classes={{ root: this.props.classes.listRoot }}>
                {
                    this.props.items.map((item, i) => (
                        <ListItem divider={true} button key={i}>
                            <ListItemText primary={ item.title } />
                        </ListItem>
                    ))
                }
            </List>
        );

    }
}

export default withStyles({
    listRoot: {
        display: 'flex',
        overflowX: 'scroll'
    }
})(MainMenu);