import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import EventCard from '../EventCard/EventCard';
import EventCardModel from '../../Models/EventCardModel';
import ShareModal from '../ShareModal/ShareModal';
import ShareModalStore from '../../Stores/ShareModalStore';
import EventsData from './EventsData.json';

interface EventCardTileListProps {
    mix?: string;
}

let shareModalstore = new ShareModalStore();

class EventCardTileList extends Component<EventCardTileListProps> {
    render() {
        return (
            <>
                <Grid container spacing={32} className={this.props.mix}>
                    {
                        EventsData['events'].map((eventData, i) => {
                            let eventCardModel = new EventCardModel(eventData.image, eventData.title);

                            return (
                                <Grid item xs={12} sm={4} md={3} key={i}>
                                    <EventCard
                                        image={eventCardModel.image} 
                                        title={eventCardModel.title} 
                                        key={i}
                                        shareModalStore={shareModalstore}
                                    >
                                    </EventCard>
                                </Grid>
                            )
                        })
                    }
                </Grid>

                <ShareModal shareModalStore={shareModalstore} />>
            </>
        )
    }
}

export default EventCardTileList;