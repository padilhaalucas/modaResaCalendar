import React from 'react'

import { Switch, Route, HashRouter } from "react-router-dom"

const Router = ({ routes }: any) => {
  return (
    <HashRouter>
      <Switch>
        {routes.map((route: any, i: any) => {
          return (
            <Route key={i} exact path={route.path} component={route.component} />
          )
        })}
      </Switch>
    </HashRouter>
  )
}

export default Router