import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
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
  const auth = useSelector(state => state.auth.token !== null)

  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main_content">
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          {auth ? (
            <>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/list/new" element={<NewList />} />
              <Route
                exact
                path="/lists/:listId/tasks/:taskId"
                element={<EditTask />}
              />
              <Route exact path="/lists/:listId/edit" element={<EditList />} />
              <Route exact path="/lists/:listId" element={<ListIndex />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/signin" />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
