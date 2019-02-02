import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer }  from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import EventCard from '../EventCard/EventCard';
import EventsData from './EventsData.json';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface EventCardTileListProps {
    mix?: string;
}

class EventCardTileList extends Component<EventCardTileListProps> {
    render() {
        return (
            <>
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
                <Dialog
                    // open={this.state.open}
                    open={true}
                    // onClose={this.handleClose}
                >
                    <DialogActions>
                        <IconButton>
                            <CloseIcon/>
                        </IconButton>
                    </DialogActions>

                    <DialogTitle>Расшарь, слыш?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Соц сеточка 1, соц сеточка2
                            Соц сеточка 1, соц сеточка2
                            Соц сеточка 1, соц сеточка2
                            Соц сеточка 1, соц сеточка2
                        </DialogContentText>
                    </DialogContent>

                </Dialog>
            </>
        )
    }
}

export default EventCardTileList;