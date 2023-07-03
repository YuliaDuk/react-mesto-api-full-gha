import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      onClose={props.onClose}
      isOpen={props.isOpen}
      title="Обновить аватар"
      name="imgred"
    >
      <input
        ref={avatarRef}
        id="img-input"
        type="url"
        name="newimg"
        className="popup__item popup__item_el_img"
        placeholder="Ссылка"
        required
      />
      <span className="img-input-error popup__item-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
