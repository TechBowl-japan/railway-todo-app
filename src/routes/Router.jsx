import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { NewTask } from "../pages/NewTask";
import { NewList } from "../pages/NewList";
// import { EditTask } from "../pages/EditTask";
import { EditTaskModal } from "../pages/EditTaskModal";
import { SignUp } from "../pages/SignUp";
import { EditList } from "../pages/EditList";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/task/new" element={<NewTask />} />
            <Route exact path="/list/new" element={<NewList />} />
            {/* <Route
              exact
              path="/lists/:listId/tasks/:taskId"
              element={<EditTask />}
            /> */}
            <Route
              exact
              path="/lists/:listId/tasks/:taskId"
              element={<EditTaskModal />}
            />
            <Route exact path="/lists/:listId/edit" element={<EditList />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />}></Route>
        )}
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
