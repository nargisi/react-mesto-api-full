function PopupWithForm(props) {
  const { title, name, buttonText, children, isOpen, onClose, onSubmit } =
    props;

  const classList = `popup popup_${name} ${isOpen && 'popup_opened'}`;

  return (
    <div className={classList}>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close" type="button" />
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_type_${name}`}
          name="form"
          noValidate
        >
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
