import Card from "./Card";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          type="button"
          className="profile__img-button"
          aria-label="Редактировать"
        >
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            type="button"
            className="profile__button"
            aria-label="Редактировать"
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            onCardLike={props.onCardLike}
            onCardClick={props.handleCardClick}
            onCardDelete={props.onCardDelete}
            card={card}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
