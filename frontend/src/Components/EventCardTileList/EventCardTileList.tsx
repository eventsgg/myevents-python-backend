import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { EventCard } from '../EventCard/EventCard';
import { EventCardModel } from '../../Models/EventCardModel';
import EventsData from './EventsData.json';

interface IEventCardTileListProps {
    mix?: string;
}

class EventCardTileList extends Component<IEventCardTileListProps> {
    render() {
        return (
            <>
                <Grid container spacing={32} className={this.props.mix}>
                    {
                        EventsData.events.map((eventData, i) => {
                            let eventCardModel = new EventCardModel(eventData.image, eventData.title);

                            return (
                                <Grid item xs={12} sm={4} md={3} key={i}>
                                    <EventCard image={eventCardModel.image} title={eventCardModel.title} key={i} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </>
        )
    }
}

export { EventCardTileList };