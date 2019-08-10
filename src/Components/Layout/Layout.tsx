import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Provider } from 'mobx-react';

import { Header } from '../Header/Header';
import { PageProgress } from '../PageProgress/PageProgress';
import { ShareModal } from '../ShareModal/ShareModal';
import { AuthModal } from '../AuthModal/AuthModal';
import { MainContent } from '../MainContent/MainContent';
import { Footer } from '../Footer/Footer';

// import { EventPageContent } from '../PagesContent/Event/Event';
// import { RewardsPageContent } from '../PagesContent/Rewards/Rewards';
// import { NotFoundPageContent } from '../PagesContent/NotFound/NotFound';
// import { Events as PartnerEvents } from '../PagesContent/Partner/Events/Events';
// import { Companies as PartnerCompanies } from '../PagesContent/Partner/Companies/Companies';

import { shareModalStore } from '../../Stores/ShareModalStore';
import { authModalStore } from '../../Stores/AuthModalStore';
import { authStore } from '../../Stores/AuthStore';
import { pageLoadingStore } from '../../Stores/PageLoadingStore';

const styles = theme => ({
    layouteRoot: {
        overflow: 'hidden'
    },
    layoutVertMargin: {
        marginTop: '20px'
    },
    layoutHorizMargin: {
        ...theme.mixins.gutters()
    }
});

interface ILayoutProps {
    classes: any;
}

const globals = {
    shareModalStore,
    authModalStore,
    authStore,
    pageLoadingStore,
};

class PureLayout extends React.Component<ILayoutProps> {
    render() {
        var { classes } = this.props;

        return (
            <Provider  {...globals}>
                <div className={classes.layoutRoot}>
                    <PageProgress />
                    <Header />
                    <MainContent mix={`${classes.layoutVertMargin} ${classes.layoutHorizMargin}`}>
                        {this.props.children}
                    </MainContent>
                    <ShareModal shareModalStore={shareModalStore} />
                    <AuthModal authModalStore={authModalStore} />

                    <Footer mix={classes.layoutVertMargin} />
                </div>
            </Provider>
        );
    }
}

const Layout = withStyles(styles)(PureLayout);

export { Layout };
