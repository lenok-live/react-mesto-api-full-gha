import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" 
        id="avatar" button="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>

      <div className="popup__section">
        <input className="popup__input popup__input_type_avatar" ref={avatarRef} type="url" name="avatar" id="popup__input-avatar" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error popup__input-avatar-error" />
      </div>
        
    </PopupWithForm>
  )
}

export default EditAvatarPopup;