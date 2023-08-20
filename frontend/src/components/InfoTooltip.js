import React from "react";
import error from "../images/error.svg";
import good from "../images/good.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={props.onClose} />
        <img src={props.isConfirmStatus ? good : error} alt=''/>
        <p>{props.isConfirmStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;