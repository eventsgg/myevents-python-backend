import React from 'react';
import { observer } from 'mobx-react';

import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { PartnerAuthForm } from '../PartnerAuthForm/PartnerAuthForm';
import shareSocials from '../../Configs/shareSocials';

interface IAuthModalProps {
    authModalStore: {
        open: boolean;
    };
    classes: any;
}

interface IAuthModalState {
    selectedTabIndex: number;
}

@observer class PureAuthModal extends React.Component<IAuthModalProps, IAuthModalState> {
    constructor(props: IAuthModalProps) {
        super(props);

        this.state = {
            selectedTabIndex: 0
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleClose() {
        this.props.authModalStore.open = false;
    }

    handleTabChange(_e, val: number) {
        this.setState({
            selectedTabIndex: val
        });
    }

    render() {
        const { classes } = this.props;
        const { selectedTabIndex } = this.state;
        const Socials = withStyles({
            hidden: {
                display: 'none'
            }
        })(this.renderSocials);

        return (
            <Dialog
                open={this.props.authModalStore.open}
                onClose={this.handleClose}
                fullWidth={true}
            >
                <DialogTitle className={classes.titleRoot}>
                    <Tabs
                        variant="fullWidth"
                        value={selectedTabIndex}
                        onChange={this.handleTabChange}
                    >
                        <Tab label="Авторизация" />
                        <Tab label="Для партнеров" />
                    </Tabs>
                    <IconButton className={classes.closeButtonRoot} onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Socials active={selectedTabIndex === 0} />
                    <PartnerAuthForm active={selectedTabIndex === 1} />
                </DialogContent>

            </Dialog>

        )
    }

    renderSocials(props: { active: boolean, classes: { hidden: string } }) {
        const { active, classes } = props;

        return (
            <Grid
                container
                spacing={8}
                wrap="nowrap"
                classes={{ container: active ? '' : classes.hidden }}
            >
                {shareSocials.map((icon, i) => (
                    <Grid item xs={12} key={i}>
                        <Link target="_blank" href={`${icon}`}>
                            <img src={icon} alt="" />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

const AuthModal = withStyles(theme => ({
    titleRoot: {
        padding: theme.spacing(2),
        margin: 0,
        marginRight: 50
    },
    closeButtonRoot: {
        position: 'absolute',
        right: theme.spacing(),
        top: theme.spacing(),
        color: theme.palette.grey[500],
    }
}))(PureAuthModal);

export { AuthModal };