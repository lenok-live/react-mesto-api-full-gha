import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(id => id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `element__btn-like ${isLiked && 'element__btn-like_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
     <img className="element__image" onClick={handleClick} src={card.link} alt={currentUser.name} />
      {isOwn && <button className="element__btn-trash" onClick={handleDeleteClick} type="button" aria-label="Удалить" ></button>}
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Лайк" />
            <span className="element__like-counter" >{card.likes.length}</span>
          </div>
      </div>
    </article>
  )
}

export default Card;