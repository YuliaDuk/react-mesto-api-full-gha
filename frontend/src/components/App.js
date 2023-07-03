import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [statusInfoTooltip, setStatusInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isCardOpen = selectedCard.link;
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            const email = res.data.email;
            setUserData(email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          tokenCheck();
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleApiLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .redProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        setIsLoading(false);
      })
  }
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .redImgProfile(data)
      .then((res) => {
        setIsLoading(true);
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        setIsLoading(false);
      })
  }
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        setIsLoading(false);
      })
  }
  function signOut() {
    localStorage.removeItem("token");
    setUserData("");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }
  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setStatusInfoTooltip(true);
      })
      .catch((err) => {
        console.log(err);
        setStatusInfoTooltip(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Header email={userData} signOut={signOut} />
          <InfoToolTip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            status={statusInfoTooltip}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Main}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  handleCardClick={handleCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegistration={handleRegistration} />}
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>
          {loggedIn ? <Footer /> : ""}
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <AddPlacePopup
            onUpdatePlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            buttonText={isLoading ? "Сохранение..." : "Создать"}
          />
          <PopupWithForm
            class="popup"
            buttonText="Да"
            onClose={closeAllPopups}
            title="Вы уверены?"
            name="confirm"
          ></PopupWithForm>
          <ImagePopup
            isOpen={isCardOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
