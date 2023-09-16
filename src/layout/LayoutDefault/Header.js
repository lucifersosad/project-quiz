import { Link, NavLink } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function Header() {
  const token = getCookie("token");
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link to="/">Quiz</Link>
        </div>
        <ul className="header__menu">
          {token && (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/topics">Topics</NavLink>
              </li>
              <li>
                <NavLink to="/answers">Answers</NavLink>
              </li>
            </>
          )}
        </ul>
        <ul className="header__menu">
          {token ? (
            <>
              <Link to="/logout">Logout</Link>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}
export default Header;
