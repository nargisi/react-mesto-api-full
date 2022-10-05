import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__group ${
    isLiked ? ' element__group_active' : ' '
  }`;

  return (
    <li className="element">
      <div className="element__container">
        <img
          onClick={handleClick}
          className="element__mask-group"
          src={card.link}
          alt={card.name}
        />
        {isOwn && (
          <button
            className="element__basket"
            type="button"
            aria-label="Удалить фото"
            onClick={handleDeleteClick}
          />
        )}
      </div>
      <div className="element__sign">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__square">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
          />
          <div className="element__counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
