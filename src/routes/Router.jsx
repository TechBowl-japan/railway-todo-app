import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Sidebar } from "~/components/Sidebar";
import Home from "~/pages/index.page";
import NotFound from "~/pages/404";
import SignIn from "~/pages/signin/index.page";
import NewList from "~/pages/list/new/index.page";
import EditTask from "~/pages/lists/[listId]/tasks/[taskId]/index.page";
import SignUp from "~/pages/signup/index.page";
import EditList from "~/pages/lists/[listId]/edit/index.page";
import ListIndex from "~/pages/lists/[listId]/index.page";

export const Router = () => {
  const auth = useSelector((state) => state.auth.token !== null);

  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main_content">
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {auth ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/lists/:listId" component={ListIndex} />
              <Route exact path="/list/new" component={NewList} />
              <Route
                exact
                path="/lists/:listId/tasks/:taskId"
                component={EditTask}
              />
              <Route exact path="/lists/:listId/edit" component={EditList} />
            </Switch>
          ) : (
            <Redirect to="/signin" />
          )}
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
