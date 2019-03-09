import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { Header } from '../Header/Header';
import { ShareModal } from '../ShareModal/ShareModal';
import { MainContent } from '../MainContent/MainContent';
import { Footer } from '../Footer/Footer';
import { IndexPageContent } from '../PagesContent/Index/Index';
import { EventPageContent } from '../PagesContent/Event/Event';
import { NotFoundPageContent } from '../PagesContent/NotFound/NotFound';
import { PageProgress } from '../PageProgress/PageProgress';

import { networkEnvironment } from '../../createNetwork';
import { shareModalStore } from '../../Stores/ShareModalStore';
import { authStore } from '../../Stores/AuthStore';

interface IPageProps {
    classes: any;
}

const globals = {
    networkEnvironment,
    shareModalStore,
    authStore: authStore,
};

class PurePage extends React.Component<IPageProps> {
    render() {
        var { classes } = this.props;

        return (
            <Provider  {...globals}>
                <div className={classes.pageRoot}>
                    <PageProgress />
                    <Header />
                    <MainContent mix={`${classes.layoutVertMargin} ${classes.layoutHorizMargin}`}>
                        <Switch>
                            <Route exact path='/' component={IndexPageContent} />
                            <Route path='/deals/:id' component={EventPageContent} />
                            <Route component={NotFoundPageContent} />
                        </Switch>
                    </MainContent>

                    <ShareModal shareModalStore={shareModalStore} />

                    <Footer mix={classes.layoutVertMargin} />
                </div>
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
