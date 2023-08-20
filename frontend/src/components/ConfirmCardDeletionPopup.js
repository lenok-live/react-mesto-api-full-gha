import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmCardDeletionPopup(props) {

  function handleSumbit(e) {
    e.preventDefault();

    props.onSubmitDelete(props.card);
  }

  return (
    <PopupWithForm name="confirm" title="Вы уверены?"
          id="confirm" button="Да" 
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSumbit} />
  )
}

export default ConfirmCardDeletionPopup;