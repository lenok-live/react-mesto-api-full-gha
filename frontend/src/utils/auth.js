// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'http://localhost:3000';

// y
function checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status)
};

export const register = ({email, password}) => { // ({email, password}) y
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkRes)
};

export const authorize = ({email, password}) => { // ({email, password}) y
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkRes)
};

export const checkToken = (token) => { // const checkToken = (token) => {
  // const token = localStorage.getItem('jwt');

  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkRes)
}