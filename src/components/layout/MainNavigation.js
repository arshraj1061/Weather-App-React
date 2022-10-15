import { NavLink } from 'react-router-dom';
import Logout from '../Login/Logout';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Weather App</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/weather' className={navData => navData.isActive ? classes.active : '' }>
              Weather
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className={navData => navData.isActive ? classes.active : '' }>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to='/help' className={navData => navData.isActive ? classes.active : '' }>
              Help
            </NavLink>
          </li>
          <li>
            <NavLink to='/weather' className={navData => navData.isActive ? classes.active : '' }>
              <Logout  />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
