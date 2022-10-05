import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(
      avatarRef.current.value /* Значение инпута, полученное с помощью рефа */
    );
    avatarRef.current.value = '';
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="link-input"
        className="popup__input popup__input_type_update"
        type="url"
        name="href"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
