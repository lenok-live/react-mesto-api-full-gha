import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmCardDeletionPopup from './ConfirmCardDeletionPopup';

import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from './../utils/auth';


function App() {
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmCardDeletionPopup, setConfirmCardDeletionPopup] = useState(false);
  
  const [cards, setCards] = useState([]);
  const [removeCard, setRemoveCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  const [isSuccessInfostatus, setIsSuccessInfostatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.getProfileData()
    .then((data) => {
      setCurrentUser(data);
    }).catch((error) => console.log(error));

    api.getCards()
    .then((cards) => {
      setCards(cards);
    }).catch((error) => console.log(error));
  },[]);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
      .checkToken(token)
      .then((res) => { // .then(({res}) => {
        setUserEmail(res.email);
        setLoggedIn(true);
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    handleTokenCheck()
  }, []);  

  function handleRegister(data) {
    return auth
    .register(data)
    .then(() => {
      setIsSuccessInfostatus(true);
      handleInfoTooltipClick();
      navigate('/sign-in');
    }).catch((error) => {
      console.log(error);
      setIsSuccessInfostatus(false);
      handleInfoTooltipClick(false);
    })
  }

  function handleLogin(data) {
    return auth
    .authorize(data)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setUserEmail(data.email);
      setLoggedIn(true);
      navigate('/', {replace: true});
    }).catch((error) => {
      console.log(error);
    })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in')
  }

  function handleUpdateUser(data) {
    api.updateProfile(data)
    .then((response) => {
      setCurrentUser(response)
      closeAllPopups()
    }).catch((error) => console.log(error))
  }

  function handleUpdateAvatar(data) {
    api.userAvatar(data)
    .then((response) => {
      setCurrentUser(response)
      closeAllPopups()
    }).catch((error) => console.log(error))
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      console.log(cards);
      closeAllPopups()
    }).catch((error) => console.log(error))
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);
      
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.updateLike(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
     }).catch((error) => console.log(error))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => { setCards(cards => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
     }).catch((error) => console.log(error))
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setConfirmCardDeletionPopup(false);
    setRemoveCard(null);
    setIsInfoTooltipPopup(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmCardDeletionClick(card) {
    setConfirmCardDeletionPopup(true);
    setRemoveCard(card)
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipPopup(true);
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          userEmail={userEmail}
          onLogout={handleLogout} />

        <Routes>

          <Route path='/' element={
            <ProtectedRoute element={Main} loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}  
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmCardDeletionClick}
              cards={cards}/>} />         
           
          <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
          <Route path='/sign-up' element={<Register handleRegister={handleRegister} />} />
          <Route path='*' element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />} />

        </Routes>

        <Footer />
          
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
            
        <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} />
            
        <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit} />
            
        <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups} />
          
        <ConfirmCardDeletionPopup 
            isOpen={isConfirmCardDeletionPopup}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
            card={removeCard} />

        <InfoTooltip 
              isOpen={isInfoTooltipPopup}
              onClose={closeAllPopups}
              isConfirmStatus={isSuccessInfostatus} />
      
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
