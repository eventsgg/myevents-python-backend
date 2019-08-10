import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        minHeight: '600px',
    }
};

interface IMainContent {
    mix?: string;
    classes: any;
}

class PureMainContent extends React.Component<IMainContent> {
    render() {
        const { mix, classes, children } = this.props;
        return (
            <div className={`${mix} ${classes.root}`}>{children}</div>
        );
    }
}

const MainContent = withStyles(styles)(PureMainContent);

export { MainContent };