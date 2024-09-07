import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../authSlice';
import styles from './header.module.css';

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie('token');
    navigation('/signin');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Todoアプリ</h1>
      {auth && (
        <button onClick={handleSignOut} className={styles.signOutButton}>
          サインアウト
        </button>
      )}
    </header>
  );
};
