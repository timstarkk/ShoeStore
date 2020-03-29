import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home';
import Store from './pages/Store';
import ItemPage from './pages/ItemPage/ItemPage';
import Auth from './pages/Auth';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/store/:slug" component={ItemPage} />
          <Route exact path="/signup" component={Auth} />
          <Route exact path="/signin" component={Auth} />
        </Switch>
      </ScrollToTop>
    </>
  );
}

export default App;
