import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';

interface IBurgerProps {
    onClick?: () => void;
}

export function Burger(props: IBurgerProps) {
    return (
        <IconButton onClick={props.onClick} color="inherit">
            <MenuIcon />
        </IconButton>
    )
}