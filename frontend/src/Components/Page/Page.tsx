import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Header } from '../Header/Header';
import { EventCardTileList } from '../EventCardTileList/EventCardTileList';
import { ShareModal } from '../ShareModal/ShareModal';
import { ShareModalStore } from '../../Stores/ShareModalStore';
import { MainContent } from '../MainContent/MainContent';
import { Footer } from '../Footer/Footer';

let shareModalStore = new ShareModalStore();

interface IPageProps {
  classes: any;
}

class PurePage extends Component<IPageProps> {
  render() {
    var { classes } = this.props;

    return (
      <div className={classes.pageRoot}>
        <Header/>
        <MainContent mix={`${classes.layoutVertMargin} ${classes.layoutHorizMargin}`}>

          <Provider shareModalStore={shareModalStore}>
            <EventCardTileList />
          </Provider>

          <ShareModal shareModalStore={shareModalStore} />

        </MainContent>

        <Footer mix={classes.layoutVertMargin}/>
      </div>
    );
  }
}

const Page = withStyles(theme => ({
  pageRoot: {
    overflow: 'hidden'
  },
  layoutVertMargin: {
    marginTop: '40px'
  },
  layoutHorizMargin: {
    ...theme.mixins.gutters()
  }
}))(PurePage);

export { Page };
