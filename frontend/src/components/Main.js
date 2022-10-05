import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Footer from './Footer';
import Header from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const {
    onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
    onLogOut,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <div className="header__container">
          <p className="header__email">{currentUser.email}</p>
          <Link className="header__link" to="/sign-in" onClick={onLogOut}>
            Выйти
          </Link>
        </div>
      </Header>
      <main className="content">
        <section className="profile">
          <div className="profile__edit" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото Жак-Ив Кусто"
            />
            <div className="profile__button-edit"></div>
          </div>
          <div className="profile__block">
            <div className="profile__info">
              <div className="profile__content">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button
                  onClick={onEditProfile}
                  className="profile__info-button"
                  type="button"
                  aria-label="Редактировать профиль"
                />
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              onClick={onAddPlace}
              className="profile__button"
              type="button"
              aria-label="Добавить фото"
            />
          </div>
        </section>

        <section className="grid">
          <ul className="elements">
            {cards.map((card) => (
              <Card
                onClick={onCardClick}
                key={card._id}
                card={card}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                cards={cards}
              />
            ))}
          </ul>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Main;
