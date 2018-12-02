import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';

class Burger extends  Component {
    render() {
       return (
            <IconButton color="inherit">
                <MenuIcon/>
            </IconButton>
       )
    }
}

export default Burger;