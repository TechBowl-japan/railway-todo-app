import React, { useCallback, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';
import { useSignup } from '~/hooks/useSignup';
import { useId } from '~/hooks/useId';
import { Button } from '~/components/Button';
import { Textfield } from '~/components/TextField';

const SignUp = () => {
  const auth = useSelector(state => state.auth.token !== null);

  const id = useId();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useSignup();

  const onSubmit = useCallback(
    event => {
      event.preventDefault();

      setIsSubmitting(true);

      signup({ email, name, password })
        .catch(err => {
          setErrorMessage(`サインアップに失敗しました: ${err.message}`);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [email, name, password]
  );

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <main className="signup">
      <h2 className="signup__title">Register</h2>
      <p className="signup__error">{errorMessage}</p>
      <form className="signup__form" onSubmit={onSubmit}>
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
          type="text"
          onChange={event => setName(event.target.value)}
          autoComplete="name"
          value={email}
          mode="signup"
        >
          Name
        </Textfield>
        <Textfield
          id={id}
          type="password"
          onChange={event => setPassword(event.target.value)}
          autoComplete="password"
          value={email}
          mode="signup"
        >
          Password
        </Textfield>
        <div className="signup__form_actions">
          <Link className="app_button" data-variant="secondary" to="/signin">
            Login
          </Link>
          <div className="signup__form_actions_spacer"></div>
          <Button type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
