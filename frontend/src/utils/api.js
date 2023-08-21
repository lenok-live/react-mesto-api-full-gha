class Api {
  constructor(address) { // token
    this.address = address;
   // this.token = token;
  }

  // обработка ответа от сервера
  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка ответа от сервера: ${response.status} ${response.statusText}. Тип: ${response.type}`);
  }

  // запрос
  _request(endpoint, method, body) { 
    const token = localStorage.getItem('jwt');
    const fetchInit = {
      method: method,
      headers: {
        // authorization: this.token,
         authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    return fetch(`${this.address}/${endpoint}`, body
    ? {
      ...fetchInit,
      body: JSON.stringify(body)
    } 
    : fetchInit
    ).then(this._handleResponse)

    // // GET
    // fetch('baseUrl/endpoint', {
    //   method: method,
    //   headers: {
    //     authorization: this.token,
    //     'Content-Type': 'application/json'
    //   }
    // })

    // // POST,PUT,PATCH
    // fetch('baseUrl/endpoint', {
    //   method: method,
    //   headers: {
    //     authorization: this.token,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(body)
    // })
    
  }
  
  // получаение данных профиля
  getProfileData() {
    return this._request('users/me','GET')
  }

  // получаение карточек
  getCards() {
    return this._request('cards','GET')
  }

  // создание новой карточки
  createCard(newCard) { // { name: '', link: ''}
    return this._request('cards','POST', newCard)
  }
  // обновление данных профиля
  updateProfile(profileData) {
    return this._request('users/me', 'PATCH', profileData)
  }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, 'DELETE')
  }

  updateLike(cardId, isLiked) { // true/false
    return this._request(`cards/${cardId}/likes`, isLiked ? 'DELETE' : 'PUT')
  }

  userAvatar(avatar) {
    return this._request('users/me/avatar', 'PATCH', avatar)
  }
}

const api = new Api(
  'https://api.mesto.sultanova.nomoreparties.co'
  //'http://localhost:3000'
  // 'https://mesto.nomoreparties.co/v1/cohort-65',
  // 'd3fb2c0a-8de8-4d21-9acd-d2443a6fba3f'
  )

export default api;