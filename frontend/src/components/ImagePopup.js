function ImagePopup(props) {
  const { onClose, card } = props;

  const classList = `popup popup_image ${card ? 'popup_opened' : ''}`;

  return (
    <div className={classList}>
      <div className="popup__container-image">
        <button
          onClick={onClose}
          className="popup__close popup__close_type_image"
          type="button"
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__fig">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
