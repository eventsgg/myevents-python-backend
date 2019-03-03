import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { Header } from '../Header/Header';
import { ShareModal } from '../ShareModal/ShareModal';
import { MainContent } from '../MainContent/MainContent';
import { Footer } from '../Footer/Footer';
import { IndexPageContent } from '../IndexPageContent/IndexPageContent';
import { EventPageContent } from '../EventPageContent/EventPageContent';
import { NotFoundPageContent } from '../NotFoundPageContent/NotFoundPageContent';

import { shareModalStore } from '../../Stores/ShareModalStore';

interface IPageProps {
    classes: any;
}

class PurePage extends Component<IPageProps> {
    render() {
        var { classes } = this.props;

        return (
            <Provider shareModalStore={shareModalStore}>
                <div className={classes.pageRoot}>
                    <Header />
                    <MainContent mix={`${classes.layoutVertMargin} ${classes.layoutHorizMargin}`}>
                        <Switch>
                            <Route exact path='/' component={IndexPageContent} />
                            <Route path='/events/:id' component={EventPageContent} />
                            <Route component={NotFoundPageContent} />
                        </Switch>
                    </MainContent>

                    <ShareModal shareModalStore={shareModalStore} />

                    <Footer mix={classes.layoutVertMargin} />
                </div>
                {/* <EventCardTileList /> */}
            </Provider>
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
