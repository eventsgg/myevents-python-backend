import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import graphql from "babel-plugin-relay/macro";

import Grid from '@material-ui/core/Grid';
import { EventCard } from '../EventCard/EventCard';

interface IEventCardTileListProps {
    mix?: string;
}

function fetchQuery(operation, variables) {
    return fetch('/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json();
    });
}

const store = new Store(new RecordSource());
const network = Network.create(fetchQuery);

const query = graphql` query EventCardTileListQuery {
    allEvents {
        edges {
            node {
                ...EventCard_card
            }
        }
    }
}`

class PureEventCardTileList extends Component<IEventCardTileListProps> {
    render() {
        const { mix } = this.props;

        return (
            <QueryRenderer
                environment={new Environment({ network, store })}
                query={query}
                render={
                    ({ error, props }) => {
                        if (error) {
                            return <div>error.message</div>
                        }

                        const { allEvents } = props || {
                            allEvents: {
                                edges: new Array(10).fill({
                                    node: {
                                        mainImgMedia: {
                                            url: '',
                                            title: ''
                                        },
                                        title: ''
                                    }
                                })
                            }
                        };

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