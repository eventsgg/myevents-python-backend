import React from 'react';
import { inject } from 'mobx-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';

import { IShareModalStore, IPageLoadingStore } from '../../Typings';
import { Map } from '../Map/Map';

interface IFullEventDescrProps {
    eventId: string;
    shareModalStore?: IShareModalStore;
    pageLoadingStore?: IPageLoadingStore;
    classes: {
        vertMargin: string;
    }
}

const eventQuery = gql`
    query events($eventId: Int!) {
        events(where: {id: {_eq: $eventId}}) {
            id,
            img,
            title
        }
    }
`;

const styles = {
    vertMargin: {
        marginBottom: '40px'
    }
};

@inject('shareModalStore', 'pageLoadingStore')
class PureFullEventDescr extends React.PureComponent<IFullEventDescrProps> {
    showShareModal = (e) => {
        e.preventDefault();
        this.props.shareModalStore!.open = true;
    }

    render() {
        const { eventId, classes, pageLoadingStore } = this.props;

        return (
            <Query
                query={eventQuery}
                variables={{
                    eventId: eventId
                }}
            >
                {({ loading, error, data }) => {
                    if (error) {
                        return (<div>{error.message}</div>);
                    }

                    if (loading) {
                        pageLoadingStore!.loading = true;
                        return null;
                    }

                    pageLoadingStore!.loading = false;

                    const event = data.events[0];
                    
                    return (
                        <>
                            <Typography variant="h3" paragraph={true}>{event.title}</Typography>
                            <Typography variant="body1">
                                Измайловская, г. Москва, 1-я ул. Измайловского Зверинца, д. 8, эт. 5
                                </Typography>
                            <Grid className={classes.vertMargin} container spacing={8}>
                                <Grid item>
                                    <img style={{ width: '100%', height: '100%' }} src={event.img} alt={event.title} />
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
                }}
            </Query>
        );
    }
}

export const FullEventDescr = withStyles(styles)(PureFullEventDescr);