import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home';
import Store from './pages/Store';
import ItemPage from './pages/ItemPage/ItemPage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar/Navbar';

Amplify.configure(config);
function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/store/:slug" component={ItemPage} />
          <Route exact path="/signup" component={AuthPage} />
          <Route exact path="/signin" component={AuthPage} />
        </Switch>
      </ScrollToTop>
    </>
  );
}

export default App;
