import logo from "../images/logo.svg";
import { Link, Routes, Route } from "react-router-dom";
function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      <div className="header__nav">
        <p className="header__email">{props.email}</p>
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          ></Route>
          <Route
            path="/"
            element={
              <Link
                className="header__link header__link_type_exit"
                onClick={props.signOut}
                to="/sign-in"
              >
                Выйти
              </Link>
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
}
export default Header;
