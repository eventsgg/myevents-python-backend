import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import EventCardTileList from '../EventCardTileList/EventCardTileList';

const styles = theme => ({
  page: {
    overflow: 'hidden',
    marginTop: '30px',
    ...theme.mixins.gutters()
  }
});

interface PageProps {
  classes: {
    page: string;
  }
}

class Page extends Component<PageProps> {
  render() {
    return (
      <div className={this.props.classes.page} style={{'textAlign': 'center'}}>
        <Header></Header>
        <EventCardTileList></EventCardTileList>
      </div>
    );
  }
}

export default withStyles(styles)(Page);
