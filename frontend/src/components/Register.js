import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/auth';
import '../styles/Register.css';

const Register = ({ onStatusChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          onStatusChange('success');

          history.push('/sign-in');
        }
      })
      .catch((err) => {
        console.log(err);
        onStatusChange('failed');
      });
  };

  return (
    <>
      <Header>
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </Header>
      <div className="register">
        <p className="register__welcome">Регистрация</p>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            className="register__input"
            id="email"
            name="email"
            value={email}
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
          />
          <input
            className="register__input"
            id="password"
            name="password"
            value={password}
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
          />
          <button type="submit" className="register__submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <Link to="/sign-in" className="register__login-link">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
