import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { SignIn } from '../pages/SignIn';
import { NewTask } from '../pages/NewTask';
import { NewList } from '../pages/NewList';
import { EditTask } from '../pages/EditTask';
import { SignUp } from '../pages/SignUp';
import { EditList } from '../pages/EditList';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        {/* 非認証時 */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 認証時 */}
        {auth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/task/new" element={<NewTask />} />
            <Route path="/list/new" element={<NewList />} />
            <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
            <Route path="/lists/:listId/edit" element={<EditList />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}

        {/* 認証に関係なく表示 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
