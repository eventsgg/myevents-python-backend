import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

interface IMainContent {
    mix?: string;
    classes: any;
}

class PureMainContent extends Component<IMainContent> {
    render() {
        const { mix, classes, children } = this.props;
        return (
            <div className={`${mix} ${classes}`}>{children}</div>
        );
    }
}

const MainContent = withStyles(theme => ({
    root: {
        ...theme.mixins.gutters()
    }
}))(PureMainContent);

export { MainContent };