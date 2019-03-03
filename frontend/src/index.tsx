import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MobxDevTools from 'mobx-react-devtools';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as serviceWorker from './serviceWorker';
import { Page } from './Components/Page/Page';

const renderApp = Component => {
    return ReactDOM.render((
        <>
            <BrowserRouter>
                <Component />
            </BrowserRouter>

            <MobxDevTools />
            <CssBaseline />
        </>
    ), document.getElementById('root'));
};

renderApp(Page);

if (module.hot) {
    module.hot.accept('./Components/Page/Page', () => {
      const NextPage = require('./Components/Page/Page').Page;
      renderApp(NextPage);
    });
  }


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();