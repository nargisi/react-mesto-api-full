import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;

  const [place, setPlace] = useState('');
  const [href, setHref] = useState('');

  const handleChangePlace = (e) => {
    setPlace(e.target.value);
  };

  const handleChangeHref = (e) => {
    setHref(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ place, href });
    setPlace('');
    setHref('');
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        className="popup__input popup__input_type_place"
        type="text"
        value={place}
        name="place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangePlace}
      />
      <span className="place-input-error popup__input-error"></span>
      <input
        id="href-input"
        className="popup__input popup__input_type_href"
        type="url"
        value={href}
        name="href"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeHref}
      />
      <span className="href-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
