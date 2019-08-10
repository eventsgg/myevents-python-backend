import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { inject } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import { EventCard } from '../EventCard/EventCard';
import { IPageLoadingStore } from '../../Typings';

interface IEventCardTileListProps {
    mix?: string;
    pageLoadingStore?: IPageLoadingStore;
    category?: string;
}

const allEventsQuery = gql`
    query events($category: Int) {
        events(where: {Category: {id: {_eq: $category}}}) {
            id,
            img,
            title
        }
    }
`;

@inject('pageLoadingStore')
class PureEventCardTileList extends Component<IEventCardTileListProps> {
    render() {
        const { pageLoadingStore, category } = this.props;

        return (
            <Query
                query={allEventsQuery}
                variables={{
                    category: category
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

                    return (
                        <Grid container spacing={8}>
                            {
                                data.events.map((event, i) => {
                                    return (
                                        <Grid item xs={12} sm={4} md={3} key={i}>
                                            <EventCard card={event} key={i} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    );
                }}
            </Query>
        );
    }
}

export const EventCardTileList = PureEventCardTileList;