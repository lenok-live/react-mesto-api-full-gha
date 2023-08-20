import React from "react";

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    props.handleLogin({ email, password });
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="authentication">
        <p className="authentication__heading">Вход</p>

        <form className="authentication__form" onSubmit={handleSubmit}>
          <input id="email" name="email" type="email" placeholder="Email" value={email || ''} onChange={handleChangeEmail}/>
          <input id="password" name="password" type="password" placeholder="Пароль" value={password || ''} onChange={handleChangePassword} />
          
          <button type="submit" className="authentication__link">Войти</button>
        </form>

    </div>
  )
}

export default Login;