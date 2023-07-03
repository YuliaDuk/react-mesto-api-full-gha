import { usePopupClose } from "../hooks/usePopupClose";
function ImagePopup({ card, onClose, isOpen }) {
  usePopupClose(isOpen, onClose);
  return (
    <div
      className={`popup popup_type_preview ${
        Object.keys(card).length !== 0 ? `popup_opened` : ``
      }`}
    >
      <div className="popup__container popup__container_type_preview">
        <img src={card.link} alt={card.name} className="popup__img" />
        <button
          onClick={onClose}
          type="button"
          className="popup__close-icon"
          aria-label="Закрыть"
        ></button>
        <h3 className="popup__preview-name">{card.name}</h3>
      </div>
    </div>
  );
}
export default ImagePopup;
