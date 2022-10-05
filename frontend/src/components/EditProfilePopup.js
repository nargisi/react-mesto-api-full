import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      job: description,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать&nbsp;профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className="popup__input popup__input_type_name"
        type="text"
        value={name ?? ''}
        name="name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        id="job-input"
        className="popup__input popup__input_type_job"
        type="text"
        value={description ?? ''}
        name="job"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
      />
      <span className="job-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
