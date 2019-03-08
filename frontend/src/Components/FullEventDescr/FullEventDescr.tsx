import React from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from "babel-plugin-relay/macro";
import { inject } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';

import { IShareModalStore } from '../../Typings';
import { Map } from '../Map/Map';

interface IFullEventDescrProps {
    networkEnvironment?: any;
    eventId: string;
    shareModalStore?: IShareModalStore;
    classes: {
        vertMargin: string;
    }
}

const query = graphql` query FullEventDescrQuery($eventId: ID!) {
    event(id: $eventId) {
        id,
        title,
        mainImgMedia {
            title,
            url
        }
    }
}`

const styles = {
    vertMargin: {
        marginBottom: '40px'
    }
};

@inject('networkEnvironment', 'shareModalStore')
class PureFullEventDescr extends React.PureComponent<IFullEventDescrProps> {
    showShareModal = (e) => {
        e.preventDefault();
        this.props.shareModalStore!.open = true;
    }

    render() {
        const { networkEnvironment, eventId, classes } = this.props;

        return (
            <QueryRenderer
                environment={networkEnvironment}
                query={query}
                variables={{
                    eventId: eventId
                }}
                render={
                    ({ error, props }) => {
                        if (error) {
                            return <div>error.message</div>
                        }

                        if (!props) {
                            return 'loading';
                        }

                        const { event } = props;

                        return (
                            <>
                                <Typography variant="h3" paragraph={true}>{event.title}</Typography>
                                <Typography variant="subtitle1">
                                    Измайловская, г. Москва, 1-я ул. Измайловского Зверинца, д. 8, эт. 5
                                </Typography>
                                <Grid className={classes.vertMargin} container spacing={32}>
                                    <Grid item>
                                        <img style={{width: '100%', height: '100%'}} src={event.mainImgMedia.url} />
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={this.showShareModal} variant="contained" size="large" color="primary">
                                            Поделиться
                                            <ShareIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Map />
                            </>
                        );
                    }
                }
            />
        );
    }
}

export const FullEventDescr = withStyles(styles)(PureFullEventDescr);