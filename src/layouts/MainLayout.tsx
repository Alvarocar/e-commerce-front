import React, { Suspense } from 'react'
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom"
import DefaultLoader from '../templates/loaders/DefaultLoader'
import MainNavBar from "../templates/navbar/MainNavBar"

const HomePage = React.lazy(() => import('../pages/HomePage'))
const ProductPage = React.lazy(() => import('../pages/ProductPage'))

const MainLayout = () => {
  const { path } = useRouteMatch()
  return (
    <div id="app">
      <MainNavBar />
      <Suspense fallback={<DefaultLoader/>}>
        <Switch>
          <Route exact path={path} component={HomePage}/>
          <Route exact path={`${path}:category_slug/:product_slug`} component={ProductPage} />
          <Redirect to={path}/>
        </Switch>
      </Suspense>
    </div>
  )
}

export default MainLayout