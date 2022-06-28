import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { NewTask } from "../pages/NewTask";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        {auth ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/task/new" component={NewTask} />
          </>
        ) : (
          <Redirect to="/signin" />
        )}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
