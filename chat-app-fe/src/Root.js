import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import theme from './assets/react-toolbox/theme';
import './assets/react-toolbox/theme.css';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import ChatListContainer from './components/chat_list_container';

const Root = ({store}) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Route path="/(:filter)" component={ChatListContainer} />
      </Router>
    </ThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
