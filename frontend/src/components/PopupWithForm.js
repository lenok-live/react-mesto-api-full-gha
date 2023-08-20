import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть окно" />
        <form className="popup__form popup__form_edit" id={props.name} name={props.name} onSubmit={props.onSubmit} autoComplete="on" noValidate>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__save-button" type="submit">{props.button}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;