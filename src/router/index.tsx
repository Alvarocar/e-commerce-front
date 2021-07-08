import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const MainLayout = React.lazy(()  => import('../layouts/MainLayout'))


const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Suspense fallback={<div>Loading...</div>}>
          <MainLayout />
        </Suspense>
      </Route>
    </Switch>
  </Router>
)

export default Routes