import { Link, NavLink, Outlet } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
  return (
    <>
      <header className="app__header">
        <h1 className="app__title">
          <Link to="/">
            <span>Marvel</span> information portal
          </Link>
        </h1>
        <nav className="app__menu">
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? '#9f0013' : 'inherit',
                })}
              >
                Characters /
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/comics"
                style={({ isActive }) => ({
                  color: isActive ? '#9f0013' : 'inherit',
                })}
              >
                Comics /
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                style={({ isActive }) => ({
                  color: isActive ? '#9f0013' : 'inherit',
                })}
              >
                Search
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default AppHeader;
