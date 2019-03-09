import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from "babel-plugin-relay/macro";
import { inject } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import { EventCard } from '../EventCard/EventCard';
import { IPageLoadingStore } from '../../Typings';

interface IEventCardTileListProps {
    mix?: string;
    networkEnvironment?: any;
    pageLoadingStore?: IPageLoadingStore;
    category?: string;
}

const query = graphql` query EventCardTileListQuery($limit: Int = 100) {
    allEvents(first: $limit) {
        edges {
            node {
                ...EventCard_card
            }
        }
    }
}`

@inject('networkEnvironment', 'pageLoadingStore')
class PureEventCardTileList extends Component<IEventCardTileListProps> {
    render() {
        const {
            networkEnvironment,
            pageLoadingStore,
            category,
        } = this.props;

        return (
            <QueryRenderer
                environment={networkEnvironment}
                query={query}
                variables={{
                    // TODO: удалить, когда появяться нормальные категории
                    limit: Boolean(category) ? 2 : 100
                }}
                render={
                    ({ error, props }) => {
                        if (error) {
                            return <div>error.message</div>
                        }

                        if (!props) {
                            pageLoadingStore!.loading = true;
                            return null;
                        }

                        pageLoadingStore!.loading = false;

                        const { allEvents } = props;

                        return (
                            <Grid container spacing={32}>
                                {
                                    allEvents.edges.map((event, i) => {
                                        return (
                                            <Grid item xs={12} sm={4} md={3} key={i}>
                                                <EventCard card={event.node} key={i} />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                        )
                    }
                }
            />
        )
    }
}

export const EventCardTileList = PureEventCardTileList;