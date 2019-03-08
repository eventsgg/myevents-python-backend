import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from "babel-plugin-relay/macro";
import { inject } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import { EventCard } from '../EventCard/EventCard';

interface IEventCardTileListProps {
    mix?: string;
    networkEnvironment?: any;
}

const query = graphql` query EventCardTileListQuery {
    allEvents {
        edges {
            node {
                ...EventCard_card
            }
        }
    }
}`

@inject('networkEnvironment')
class PureEventCardTileList extends Component<IEventCardTileListProps> {
    render() {
        const { mix, networkEnvironment } = this.props;

        return (
            <QueryRenderer
                environment={networkEnvironment}
                query={query}
                render={
                    ({ error, props }) => {
                        if (error) {
                            return <div>error.message</div>
                        }

                        if (!props) {
                            return 'loading...';
                        }

                        const { allEvents } = props;

                        return (
                            <Grid container spacing={32} className={mix}>
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