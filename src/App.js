import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Store from './pages/Store';
import ItemPage from './pages/ItemPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/store/:slug" component={ItemPage} />
      </Switch>
    </>
  );
}

export default App;
