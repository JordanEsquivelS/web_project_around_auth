import React, { useState, useEffect } from "react";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import AddPlacePopup from "./AddPlacePopup";
import Footer from "./Footer";
import api from "../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteForm, setDeleteForm] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await api.getUserInfo("users/me");
        setCurrentUser(userData);
      } catch (error) {
        console.log("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleUpdateUser = async (data) => {
    try {
      const updatedUser = await api.setUserInfo(
        data.name,
        data.about,
        "users/me"
      );
      setCurrentUser(updatedUser);
      closeAllPopups();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const updatedAvatar = await api.setUserPicture(
        data.avatar,
        "users/me/avatar"
      );
      setCurrentUser((prevState) => ({
        ...prevState,
        avatar: updatedAvatar.avatar,
      }));
      closeAllPopups();
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  useEffect(() => {
    async function fetchInitialCards() {
      try {
        const cardsData = await api.getInitialCards("cards");
        setCards(cardsData);
      } catch (error) {
        console.error("Error fetching cards data:", error);
      }
    }

    fetchInitialCards();
  }, []);

  const handleCardDelete = (id) => {
    handleDeleteForm();
    setCardToDelete(id);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  const handleConfirmedDelete = async (event) => {
    event.preventDefault();

    try {
      await api.deleteCard(`cards/${cardToDelete}`);
      setCards((cards) => cards.filter((card) => card._id !== cardToDelete));
      closeAllPopups();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  const handleAddPlaceSubmit = async (newCardData) => {
    try {
      const newCard = await api.setCard(
        newCardData.name,
        newCardData.link,
        "cards"
      );
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.error("Error adding new card:", error);
    }
  };
  const handleDeleteForm = () => {
    setDeleteForm(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDeleteForm(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onDeleteClick={handleCardDelete}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          isDeleteForm={isDeleteForm}
          onDeleteForm={handleDeleteForm}
          onClosePopups={closeAllPopups}
          selectedCard={selectedCard}
          onCardClick={handleCardClick}
          handleConfirmedDelete={handleConfirmedDelete}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;