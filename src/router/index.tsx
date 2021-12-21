import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import routes from '../constants/ERoutes'
import DefaultLoader from '../templates/loaders/DefaultLoader'

const HomePage = React.lazy(() => import('../pages/HomePage'))
const ProductPage = React.lazy(() => import('../pages/ProductPage'))
const ProductsByCategory = React.lazy(() => import('../pages/ProductsByCategory'))
const SearchPage = React.lazy(() => import('../pages/SearchPage'))
const CartPage = React.lazy(() => import('../pages/CartPage'))
const SignUp = React.lazy(() => import('../pages/SignUp'))
const Login = React.lazy(() => import('../pages/Login'))
const MyAccount = React.lazy(() => import('../pages/MyAccount'))
const Success = React.lazy(() => import('../pages/Success'))


const Routes = () => (
  <Router>
    <Suspense fallback={<DefaultLoader />}>
      <Switch>
      <Route exact path={routes.HOME} component={HomePage}/>
          <Route exact path={routes.CART} component={CartPage} />
          <PrivateRoute exact path={routes.SUCCESS} Component={Success}/>
          <Route exact path={routes.SEARCH} component={SearchPage}/>
          <PublicRoute exact path={routes.SIGNUP} Component={SignUp} />
          <PublicRoute exact path={routes.LOGIN} Component={Login}/>
          <PrivateRoute exact path={routes.MYACCOUNT} Component={MyAccount}/>
          <Route exact path={routes.CATEGORY} component={ProductsByCategory} />
          <Route exact path={routes.PRODUCT_PAGE} component={ProductPage} />
          <Redirect to={routes.HOME}/>
      </Switch>
    </Suspense>
  </Router>
)

export default Routes