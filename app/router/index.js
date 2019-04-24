import React from 'react'
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import app from '../app'
import login from '../login'
import NotFound from '../components/abnormal_pages/NotFound'
import NoAuth from '../components/abnormal_pages/NoAuth'
import ServerError from '../components/abnormal_pages/ServerError'
import PersonTable from '../components/person-table'
import Overview from '../components/Overview'
import Table from '../components/function_pages/Table'
import SyncTable from '../components/function_pages/SyncTable'
import Corn from '../components/function_pages/Corn'
import Eggsplant from '../components/function_pages/Eggsplant'
import EggsplantDetail from '../components/function_pages/EggsplantDetail'

export default () => (
  <Router history={hashHistory}>
      <Route path="/" exact={true} component={app}>
        <IndexRoute component={Overview} />
        <Route path="/overview" component={Overview} />
        <Route path="/overview" component={Overview} />
        <Route path="/abnormal-pages/no-auth" component={NoAuth} />
        <Route path="/abnormal-pages/serve-error" component={ServerError} />
        <Route path="/abnormal-pages/not-found" component={NotFound} />
        <Route path="/function-pages/table" component={Table} />
        <Route path="/function-pages/sync-table" component={SyncTable} />
        <Route path="/function-pages/corn" component={Corn} />
        <Route path="/function-pages/eggsplant/use" component={Eggsplant} />
        <Route path="/function-pages/eggsplant/detail" component={EggsplantDetail} />
        <Redirect from="/" to="/overview"></Redirect> 
      </Route>
      <Route path="/login" component={login} />
  </Router>
)
