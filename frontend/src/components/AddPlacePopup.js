import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup (props) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
    }, [props.isOpen]);

  function handleSumbit(e) {
    e.preventDefault();
    
    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  function handleChangeCardName(e) {
    setName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm 
        isOpen={props.isOpen} 
        onClose={props.onClose}
        onSubmit={handleSumbit} 
        name="add" title="Новое место" 
        id="add" button="Создать">

        <div className="popup__section">
          <input className="popup__input popup__input_type_title" type="text" name="name" id="popup__input-title" placeholder="Название" required minLength={2} maxLength={30} value={name || ""} onChange={handleChangeCardName}/>
          <span className="popup__input-error popup__input-title-error" />
        </div>
        <div className="popup__section">
          <input className="popup__input popup__input_type_link" type="url" name="link" id="popup__input-link" placeholder="Ссылка на картинку" required value={link || ""} onChange={handleChangeCardLink}/>
          <span className="popup__input-error popup__input-link-error" />
        </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;