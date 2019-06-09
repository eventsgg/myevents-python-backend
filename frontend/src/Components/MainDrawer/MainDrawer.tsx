import React, { ReactNode } from 'react';
import Link from 'next/link';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import EventIcon from '@material-ui/icons/Event';

import menuList from './menuList.json';

const iconsConfig = {
    "rewards": CodeIcon,
    "partner-companies": MeetingRoomIcon,
    "partner-events": EventIcon,
};

const styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    list: {
        width: '240px'
    },
    listText: {
        padding: 0
    },
    menuHeading: {
        display: 'inline-block',
        verticalAlign: 'middle'
    }
};

interface IMainDrawerProps {
    open: boolean;
    children: ReactNode;
    onOutsideClick: () => void;
    onMenuClick: () => void;
    classes: {
        link: string;
        list: string;
        menuHeading: string;
        listText: string;
    }
}

const MainDrawerPresenter = React.memo(function MainDrawer(props: IMainDrawerProps) {
    const { open, onOutsideClick, onMenuClick, classes } = props;

    return (
        <Drawer open={open} ModalProps={{ onBackdropClick: onOutsideClick }}>
            <div>
                {props.children}
                <Typography variant="h6" className={classes.menuHeading}>Меню</Typography>
            </div>
            <Divider />
            <List className={classes.list}>
                {
                    menuList.left_menu.map(menuItem => {
                        let MenuIcon = iconsConfig[menuItem.id];
                        return (
                            <Link
                                href={menuItem.url}
                                key={menuItem.id}
                            >
                                <ListItem button onClick={onMenuClick}>
                                    {
                                        MenuIcon ? (
                                            <ListItemIcon>
                                                <MenuIcon />
                                            </ListItemIcon>
                                        ) : null
                                    }
                                    <ListItemText className={classes.listText}>
                                        {menuItem.title}
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        )
                    })
                }
            </List>
        </Drawer>
    );
});

const MainDrawer = withStyles(styles)(MainDrawerPresenter);

export { MainDrawer };