import React from 'react';

function ImagePopup({ card, onClose }) {
  return(
  <div className={`popup popup_img ${card ? "popup_opened" : ""}`}>
    <div className="popup__container-img">
      <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose} />
      <img className="popup__img" src={card?.link} alt={card?.name} />
      <h2 className="popup__title-img">{card?.name}</h2>
    </div>
  </div>
  )
}

export default ImagePopup;