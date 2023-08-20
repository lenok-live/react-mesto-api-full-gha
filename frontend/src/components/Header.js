import React from 'react';
import headerLogo from'../images/logo/logo.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header(props) {
  return (
    <div>
      <header className='header'>
        <img className='header__logo' src={headerLogo} alt='Логотип проекта Mesto' />

        <Routes>

          <Route path='/sign-in' element={<Link className='header__button-link' to='/sign-up'>Регистрация</Link>} />
          <Route path='/sign-up' element={<Link className='header__button-link' to='/sign-in'>Войти</Link>} />

          <Route path='/' element={
            <nav className='header__nav'>
              <span className='header__email'>{props.userEmail}</span>
              <Link className='header__button-link' to='/sign-in' onClick={props.onLogout}>Выйти</Link>
            </nav>}>
          </Route>

        </Routes>
      </header>
    </div>
  );
}

export default Header;
