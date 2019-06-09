import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import shareSocials from '../../Configs/shareSocials';

interface IShareModalProps {
    shareModalStore: {
        open: boolean;
    }
    classes: any
}

@observer class PureShareModal extends Component<IShareModalProps> {
    close = () => {
        this.props.shareModalStore.open = false;
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={this.props.shareModalStore.open}
                onClose={this.close}
                fullWidth={true}
            >
                <DialogTitle disableTypography className={classes.titleRoot}>
                    <Typography variant="h6">Расшарь пост в социальной сети и получи большую скидку</Typography>
                    <IconButton className={classes.closeButtonRoot} onClick={this.close}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={32} wrap="nowrap">
                        {
                            shareSocials.map((icon, i) => {
                                return (
                                    <Grid item xs={12} key={i}>
                                        <Link target="_blank" href={`${icon}`}>
                                            <img src={icon} alt="" />
                                        </Link>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
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