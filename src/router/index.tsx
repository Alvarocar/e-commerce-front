import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import DefaultLoader from '../templates/loaders/DefaultLoader'

const MainLayout = React.lazy(() => import('../layouts/MainLayout'))


const Routes = () => (
  <Router>
    <Suspense fallback={<DefaultLoader />}>
      <Switch>
        <Route exact path="/" component={MainLayout}/>
      </Switch>
    </Suspense>
  </Router>
)

export default Routes