import App, { Container } from 'next/app';
import Head from 'next/head'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/Libs/getPageContext';
import withApolloClient from '../src/Libs/with-apollo-client';
import { ApolloProvider } from 'react-apollo';

const isProduction =  process.env.NODE_ENV === 'production';
const MobxDevTools = !isProduction ? require('mobx-react-devtools').default : () => null;

class MyApp extends App {
    constructor() {
        super();

        this.pageContext = getPageContext();
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, apolloClient } = this.props;

        return (
            <Container>
                <Head>
                    <title>My Events</title>
                </Head>

                <ApolloProvider client={apolloClient}>
                    <JssProvider
                        registry={this.pageContext.sheetsRegistry}
                        generateClassName={this.pageContext.generateClassName}
                    >
                        <MuiThemeProvider
                            theme={this.pageContext.theme}
                            sheetsManager={this.pageContext.sheetsManager}
                        >
                            <CssBaseline />
                            <Component pageContext={this.pageContext} {...pageProps} />
                            <MobxDevTools />
                        </MuiThemeProvider>
                    </JssProvider>
                </ApolloProvider>
            </Container>
        );
    }
}

export default withApolloClient(MyApp);