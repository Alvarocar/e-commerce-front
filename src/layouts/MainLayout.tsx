import React, { Suspense } from 'react'
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import DefaultLoader from '../templates/loaders/DefaultLoader'
import MainNavBar from "../templates/navbar/MainNavBar"
import 'react-toastify/dist/ReactToastify.css'
import DefaultFooter from '../templates/footers/DefaultFooter'
import styles from './styles.module.scss'
import PublicRoute from '../router/PublicRoute'
import PrivateRoute from '../router/PrivateRoute'

const HomePage = React.lazy(() => import('../pages/HomePage'))
const ProductPage = React.lazy(() => import('../pages/ProductPage'))
const ProductsByCategory = React.lazy(() => import('../pages/ProductsByCategory'))
const SearchPage = React.lazy(() => import('../pages/SearchPage'))
const CartPage = React.lazy(() => import('../pages/CartPage'))
const SignUp = React.lazy(() => import('../pages/SignUp'))
const Login = React.lazy(() => import('../pages/Login'))
const MyAccount = React.lazy(() => import('../pages/MyAccount'))
const Success = React.lazy(() => import('../pages/Success'))

const MainLayout = () => {
  const { path } = useRouteMatch()
  return (
    <div id="app" className={styles.main}>
      <MainNavBar />
      <Suspense fallback={<DefaultLoader/>}>
        <Switch>
          <Route exact path={path} component={HomePage}/>
          <Route exact path={`${path}cart`} component={CartPage} />
          <PrivateRoute exact path={`${path}cart/success`} Component={Success}/>
          <Route exact path={`${path}search`} component={SearchPage}/>
          <PublicRoute exact path={`${path}sign-up`} Component={SignUp} />
          <PublicRoute exact path={`${path}log-in`} Component={Login}/>
          <PrivateRoute exact path={`${path}my-account`} Component={MyAccount}/>
          <Route exact path={`${path}:category_slug`} component={ProductsByCategory} />
          <Route exact path={`${path}:category_slug/:product_slug`} component={ProductPage} />
          <Redirect to={path}/>
        </Switch>
      </Suspense>
      <DefaultFooter />
      <ToastContainer />
    </div>
  )
}

export default MainLayout