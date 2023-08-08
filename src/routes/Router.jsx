import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Sidebar } from '~/components/Sidebar'
import Home from '~/pages/index.page'
import NotFound from '~/pages/404'
import SignIn from '~/pages/signin/index.page'
import NewList from '~/pages/list/new/index.page'
import EditTask from '~/pages/lists/[listId]/tasks/[taskId]/index.page'
import SignUp from '~/pages/signup/index.page'
import EditList from '~/pages/lists/[listId]/edit/index.page'
import ListIndex from '~/pages/lists/[listId]/index.page'

export const Router = () => {
  const auth = useSelector((state) => state.auth.token !== null)

  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main_content">
        <Switch>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          {auth ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/lists/:listId">
                <ListIndex />
              </Route>
              <Route exact path="/list/new">
                <NewList />
              </Route>
              <Route exact path="/lists/:listId/tasks/:taskId">
                <EditTask />
              </Route>
              <Route exact path="/lists/:listId/edit">
                <EditList />
              </Route>
            </>
          ) : (
            <Route path="/">
              <Redirect to="/signin" />
            </Route>
          )}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}
