import React, { Suspense } from 'react'
import { useRouteMatch, Switch, Route } from "react-router-dom"
import DefaultLoader from '../templates/loaders/DefaultLoader'
import MainNavBar from "../templates/navbar/MainNavBar"

const HomePage = React.lazy(() => import('../pages/HomePage'))

const MainLayout = () => {
  const { path } = useRouteMatch()
  return (
    <div id="app">
      <MainNavBar />
      <Suspense fallback={<DefaultLoader/>}>
        <Switch>
          <Route exact path={path} component={HomePage}/>
        </Switch>
      </Suspense>
    </div>
  )
}

export default MainLayout