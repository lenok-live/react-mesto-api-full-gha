import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
  <main className="content">

    <section className="profile">
      <a className="profile__avatar-cover" onClick={props.onEditAvatar}>
        <img className="profile__avatar" src={currentUser.avatar} alt="Avatar" />
      </a>
      <div className="profile__info">
        <h1 className="profile__title" >{currentUser.name}</h1>
        <button className="profile__open-popup" onClick={props.onEditProfile} type="button" aria-label="Редактировать" />
        <p className="profile__subtitle" >{currentUser.about}</p>
      </div>
      <button className="profile__button" onClick={props.onAddPlace} type="button" />
    </section>

    <section className="elements">
      {props.cards.map((card) => 
          <Card card={card} key={card._id} 
          onCardClick={props.onCardClick} 
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete} />
        )}
    </section>

  </main>
  );
}


export default Main;