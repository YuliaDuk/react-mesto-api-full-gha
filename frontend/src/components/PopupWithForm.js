import { usePopupClose } from "../hooks/usePopupClose";
function PopupWithForm(props) {
  usePopupClose(props.isOpen, props.onClose);
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-icon"
          aria-label="Закрыть"
        />
        <h3 className="popup__name">{props.title}</h3>
        <form
          onSubmit={props.onSubmit}
          className={`popup__form popup__form_type_${props.name}`}
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
