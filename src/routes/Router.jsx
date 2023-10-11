import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { NewTask } from "../pages/NewTask";
import { NewList } from "../pages/NewList";
import { EditTask } from "../pages/EditTask";
import { SignUp } from "../pages/SignUp";
import { EditList } from "../pages/EditList";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        {auth ? (
          <>
            <Route path="/" component={Home} />
            <Route path="/task/new" component={NewTask} />
            <Route path="/list/new" component={NewList} />
            <Route path="/lists/:listId/tasks/:taskId" component={EditTask} />
            <Route path="/lists/:listId/edit" component={EditList} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/signin" />} />
        )}
        <Route component={NotFound} />
        </Routes>
    </BrowserRouter>
  )
}
