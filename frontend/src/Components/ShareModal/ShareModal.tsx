import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

interface IShareModalProps {
    shareModalStore: {
        open: boolean;
    }
    classes: any
}

@observer class PureShareModal extends Component<IShareModalProps> {
    close() {
        this.props.shareModalStore.open = false;
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={this.props.shareModalStore.open} 
                onClose={this.close.bind(this)}
            >
                <DialogTitle disableTypography className={classes.titleRoot}>
                    <Typography variant="h6">Расшарь, слыш?</Typography>
                    <IconButton className={classes.closeButtonRoot} onClick={this.close.bind(this)}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Соц сеточка 1, соц сеточка2
                        Соц сеточка 1, соц сеточка2
                        Соц сеточка 1, соц сеточка2
                        Соц сеточка 1, соц сеточка2
                    </DialogContentText>
                </DialogContent>

            </Dialog>

        )
    }
}

const ShareModal = withStyles(theme => ({
    titleRoot: {
        padding: theme.spacing.unit * 2,
        margin: 0,
        marginRight: 50
    },
    closeButtonRoot: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    }
}))(PureShareModal);

export { ShareModal };