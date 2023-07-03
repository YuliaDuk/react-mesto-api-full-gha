import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext } from "react";
import { useForm } from "../hooks/useForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values);
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      onClose={props.onClose}
      isOpen={props.isOpen}
      title="Редактировать профиль"
      name="red"
    >
      <input
        id="name-input"
        type="text"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
        className="popup__item popup__item_el_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-input-error popup__item-error"></span>
      <input
        id="job-input"
        type="text"
        name="about"
        value={values.about || ""}
        onChange={handleChange}
        className="popup__item popup__item_el_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="job-input-error popup__item-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
