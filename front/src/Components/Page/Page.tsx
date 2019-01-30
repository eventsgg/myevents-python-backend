import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import EventCardTileList from '../EventCardTileList/EventCardTileList';

const styles = theme => ({
  pageRoot: {
    overflow: 'hidden',
    ...theme.mixins.gutters()
  },
  layoutVertMargin: {
    marginTop: '20px'
  }
});

interface PageProps {
  classes: {
    pageRoot: string;
    layoutVertMargin: string;
  }
}

class Page extends Component<PageProps> {
  render() {
    var { classes } = this.props;
    return (
      <div className={classes.pageRoot}>
        <Header/>
        <EventCardTileList mix={classes.layoutVertMargin}/>
      </div>
    );
  }
}

export default withStyles(styles)(Page);
