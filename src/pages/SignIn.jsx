import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Header } from "../components/Header";
import "./signin.css";

const url = process.env.REACT_APP_API_URL;

export const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = () => {
    axios.post(`${url}/signin`, {email: email, password: password})
      .then((res) => {
        setCookie("token", res.data.token);
        history.push("/");
      })
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
      })
  }

  return (
    <div>
      <Header/>
      <main className="signin">
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form">
          <label className="email-label">メールアドレス</label><br />
          <input type="email" className="email-input" onChange={handleEmailChange} /><br />
          <label className="password-label">パスワード</label><br />
          <input type="password" className="password-input" onChange={handlePasswordChange} /><br />
          <button type="button" className="signin-button" onClick={onSignIn}>サインイン</button>
        </form>
      </main>
    </div>
  )
}