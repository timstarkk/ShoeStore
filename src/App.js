import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home';
import Store from './pages/Store';
import ItemPage from './pages/ItemPage/ItemPage';
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
        </Switch>
      </ScrollToTop>
    </>
  );
}

export default App;
