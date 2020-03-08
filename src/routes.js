import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Pages/main';
import CepDetails from './Pages/cepdetails';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/cepdetails/:cep" component={CepDetails} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
