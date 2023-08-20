import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleSubmit(e) {
    
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  
  return (
    <PopupWithForm name="edit" title="Редактировать профиль"
        id="edit" button="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
          
          <div className="popup__section">
            <input className="popup__input popup__input_type_name" type="text" value={name || ''} onChange={handleChangeName} name="name" id="popup__input-name" placeholder="Имя" required minLength={2} maxLength={40} />
            <span className="popup__input-error popup__input-name-error" />
          </div>
          <div className="popup__section">
            <input className="popup__input popup__input_type_profession" type="text" value={description || ''} onChange={handleChangeDescription} name="about" id="popup__input-job" placeholder="Профессия" required minLength={2} maxLength={200} />
            <span className="popup__input-error popup__input-job-error" />
          </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;