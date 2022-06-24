import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
