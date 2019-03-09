import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        position: 'fixed' as 'fixed',
        width: '100%',
        zIndex: 9999,
    }
}

function PageProgressPresenter(props) {
    return (
        <div className={props.classes.root}>
            <LinearProgress color="secondary" />
        </div>
    );
}

export const PageProgress = withStyles(styles)(PageProgressPresenter);