import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import EventCard from '../EventCard/EventCard';
import EventsData from './EventsData.json';

interface EventCardTileListProps {
    mix?: string;
}

class EventCardTileList extends Component<EventCardTileListProps> {
    render() {
        return (
            <Grid container spacing={32} className={this.props.mix}>
                {
                    EventsData['events'].map((eventData, i) => (
                        <Grid item xs={12} sm={4} md={3} key={i}>
                            <EventCard
                                image={eventData.image} 
                                title={eventData.title} 
                                key={i}
                            >
                            </EventCard>
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
}

export default EventCardTileList;