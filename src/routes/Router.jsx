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

// アプリケーションのルーティングを定義する Router コンポーネント
export const Router = () => {
  // Redux ストアから認証情報を取得
  const auth = useSelector((state) => state.auth.isSignIn);

  // JSXを返す
  return (
    <BrowserRouter>
      <Routes>
        {/* サインインページのルート */}
        <Route path="/signin" element={<SignIn />} />
        {/* サインアップページのルート */}
        <Route path="/signup" element={<SignUp />} />
        {auth ? ( // 認証済みの場合
          <>
            {/* ホームページのルート */}
            <Route path="/" element={<Home />} />
            {/* タスク新規作成ページのルート */}
            <Route path="/task/new" element={<NewTask />} />
            {/* リスト新規作成ページのルート */}
            <Route path="/list/new" element={<NewList />} />
            {/* タスク編集ページのルート */}
            <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
            {/* リスト編集ページのルート */}
            <Route path="/lists/:listId/edit" element={<EditList />} />
          </>
        ) : (
          // 未認証の場合
          <>
            {/* ユーザーが認証されていない場合のルート */}
            <Route
              path="/"
              element={<Navigate to="/signin" />} // サインインページにリダイレクト
            />
          </>
        )}
        {/* ルートが存在しない場合の NotFound ページ */}
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
