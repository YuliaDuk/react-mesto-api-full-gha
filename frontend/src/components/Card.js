import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";
function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <article className="element">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="element__pic"
      />
      {isOwn && (
        <button
          type="button"
          className="element__trash"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__text">
        <h2 className="element__description">{props.card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            aria-label="Лайк"
          ></button>
          <p className="element__qty-like">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;
