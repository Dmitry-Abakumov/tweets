import { NavLink } from 'react-router-dom';

import css from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={css.navbar}>
      <NavLink className={css.navLink} to="/">
        Home
      </NavLink>
      <NavLink className={css.navLink} to="/tweets">
        Tweets
      </NavLink>
    </div>
  );
};

export default Navbar;
