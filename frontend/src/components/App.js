import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Loader from './Loader';
import InfoToolTip from './InfoToolTip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';
import api from '../utils/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoading, setIsloading] = useState(true);

  const [registerStatus, setRegisterStatus] = useState('');

  const history = useHistory();

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeCardLike(card._id, !isLiked) 
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard.data : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(deletedCard) {
    const isOwn = deletedCard.owner === currentUser._id;
    if (isOwn) {
      api
        .deleteOwnCard(deletedCard._id)
        .then(() => {
          const filteredCards = cards.filter(
            (card) => card._id !== deletedCard._id
          );
          setCards(filteredCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser((prevState) => ({
              ...prevState,
              email: res.data.email,
            }));
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          history.push('/sign-in')
          console.log(err);
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cardsData) => {
          setCards(cardsData.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsloading(true);
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser((prevState) => ({ ...prevState, ...userData.data }));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = ({ name, job }) => {
    api
      .updateProfile({ name, job })
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.data.name,  about: res.data.about});
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (link) => {
    api
      .editUserAvatar(link)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar:link });
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = ({ place, href }) => {
    api
      .addNewCard({ place, href })
      .then((res) => {
        setCards([res.data, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatusChange = (status) => {
    setRegisterStatus(status);
  };

  if (isLoading && loggedIn) {
    return <Loader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onStatusChange={handleStatusChange} />
          </Route>
          <ProtectedRoute
            component={Main}
            loggedIn={loggedIn}
            exact
            path="/"
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onLogOut={handleLogOut}
          />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleCloseAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup onClose={handleCloseAllPopups} card={selectedCard} />

      <PopupWithForm
        title="Вы уверены?"
        name="ask"
        buttonText="Да"
      ></PopupWithForm>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>

      <InfoToolTip
        registerStatus={registerStatus}
        onStatusChange={handleStatusChange}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
