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
        <Route path="/signin" element={<SignIn></SignIn>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        {auth ? (
          <>
            <Route path="/" element={<Home></Home>} />
            <Route path="/task/new" element={<NewTask></NewTask>} />
            <Route path="/list/new" element={<NewList></NewList>} />
            <Route path="/lists/:listId/tasks/:taskId" element={<EditTask></EditTask>} />
            <Route path="/lists/:listId/edit" element={<EditList></EditList>} />
          </>
        ) : (
          <Route path="/signin" element={<SignIn></SignIn>} />
        )}
        <Route element={<NotFound></NotFound>} />
      </Routes>
    </BrowserRouter>
  )
}
