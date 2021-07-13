import React, { Suspense } from 'react'
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import DefaultLoader from '../templates/loaders/DefaultLoader'
import MainNavBar from "../templates/navbar/MainNavBar"
import 'react-toastify/dist/ReactToastify.css'
import DefaultFooter from '../templates/footers/DefaultFooter'
import styles from './styles.module.scss'

const HomePage = React.lazy(() => import('../pages/HomePage'))
const ProductPage = React.lazy(() => import('../pages/ProductPage'))
const ProductsByCategory = React.lazy(() => import('../pages/ProductsByCategory'))
const SearchPage = React.lazy(() => import('../pages/SearchPage'))
const CartPage = React.lazy(() => import('../pages/CartPage'))
const SignUp = React.lazy(() => import('../pages/SignUp'))

const MainLayout = () => {
  const { path } = useRouteMatch()
  return (
    <div id="app" className={styles.main}>
      <MainNavBar />
      <Suspense fallback={<DefaultLoader/>}>
        <Switch>
          <Route exact path={path} component={HomePage}/>
          <Route exact path={`${path}cart`} component={CartPage} />
          <Route exact path={`${path}search`} component={SearchPage}/>
          <Route exact path={`${path}sign-up`} component={SignUp} />
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