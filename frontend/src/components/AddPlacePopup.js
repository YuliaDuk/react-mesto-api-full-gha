import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({});
  useEffect(() => {
    setValues(values);
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace(values);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      onClose={props.onClose}
      isOpen={props.isOpen}
      title="Новое место"
      name="add"
    >
      <input
        value={values.name || ""}
        onChange={handleChange}
        id="placename-input"
        type="text"
        name="name"
        className="popup__item popup__item_type_add popup__item_el_place"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        required
      />
      <span className="placename-input-error popup__item-error"></span>
      <input
        value={values.link || ""}
        onChange={handleChange}
        id="src-input"
        type="url"
        name="link"
        className="popup__item popup__item_type_add popup__item_el_src"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="src-input-error popup__item-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
