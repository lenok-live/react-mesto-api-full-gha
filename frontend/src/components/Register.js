import React from "react";
import { Link } from "react-router-dom";

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  function handleSubmit(e) {
    e.preventDefault();

    props.handleRegister({ email, password });
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="authentication">
        <p className="authentication__heading">Регистрирация</p>

        <form className="authentication__form" onSubmit={handleSubmit}>
          <input id="email" name="email" type="email" placeholder="Email" value={email || ''} onChange={handleChangeEmail} />
          <input id="password" name="password" type="password" placeholder="Пароль" value={password || ''} onChange={handleChangePassword} />
          
          <button type="submit" className="authentication__link">Зарегистрироваться</button>
        </form>

        <div className="authentication__signin">
          <p>Уже зарегистрированы?</p>
           <Link to="/sign-in" className="authentication__login-link">Войти</Link> 
        </div>
    </div>
  )
}

export default Register;