import React, { useCallback, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogin } from '~/hooks/useLogin';
import { useId } from '~/hooks/useId';
import './index.css';
import { Button } from '~/components/Button';
import { Textfield } from '~/components/TextField';
const SignIn = () => {
  const auth = useSelector(state => state.auth.token !== null);
  const { login } = useLogin();

  const id = useId();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(
    event => {
      event.preventDefault();

      setIsSubmitting(true);

      login({ email, password })
        .catch(err => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [email, password]
  );

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <main className="signin">
      <h2 className="signin__title">Login</h2>
      <p className="signin__error">{errorMessage}</p>
      <form className="signin__form" onSubmit={onSubmit}>
        <Textfield
          id={id}
          type="email"
          onChange={event => setEmail(event.target.value)}
          autoComplete="email"
          value={email}
          mode="signup"
        >
          E-mail Address
        </Textfield>
        <Textfield
          id={id}
          type="password"
          onChange={event => setPassword(event.target.value)}
          autoComplete="password"
          value={password}
          mode="signin"
        >
          Password
        </Textfield>
        <div className="signin__form_actions">
          <Link className="app_button" data-variant="secondary" to="/signup">
            Register
          </Link>
          <div className="signin__form_actions_spacer"></div>
          <Button type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
