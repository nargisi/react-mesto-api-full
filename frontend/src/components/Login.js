import { React, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/auth';
import '../styles/Register.css';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .autorise(email, password)
      .then((data) => {
        if (!data) {
          setMessage('Что-то пошло не так! Попробуйте еще раз!');
        }
        if (data?.token) {
          setEmail('');
          setPassword('');
          handleLogin();
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header>
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </Header>
      <div className="register">
        <p className="register__welcome">Вход</p>
        <p className="register__error">{message}</p>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            className="register__input"
            id="email"
            name="email"
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="register__input"
            id="password"
            name="password"
            value={password}
            type="password"
            placeholder="Пароль"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="register__submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
