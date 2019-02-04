import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Header } from '../Header/Header';
import { EventCardTileList } from '../EventCardTileList/EventCardTileList';
import { ShareModal } from '../ShareModal/ShareModal';
import { ShareModalStore } from '../../Stores/ShareModalStore';

let shareModalStore = new ShareModalStore();

interface IPageProps {
  classes: any
}

class PurePage extends Component<IPageProps> {
  render() {
    var { classes } = this.props;

    return (
      <div className={classes.pageRoot}>
        <Header/>
        <Provider shareModalStore={shareModalStore}>
          <EventCardTileList mix={classes.layoutVertMargin} />
        </Provider>
        <ShareModal shareModalStore={shareModalStore} />>
      </div>
    );
  }
}

const Page = withStyles(theme => ({
  pageRoot: {
    overflow: 'hidden',
    ...theme.mixins.gutters()
  },
  layoutVertMargin: {
    marginTop: '20px'
  }
}))(PurePage);

export { Page };
