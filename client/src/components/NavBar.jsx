import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // adapte selon ton chemin

const Navbar = () => {
  const BaseClass = 'me-10 transition hover:text-emerald-600';
  const ActiveClass = 'text-emerald-600 font-bold';

  return (
    <div className="fixed w-full h-15 shadow-lg p-2 px-5 flex justify-between items-center">
      <div className="w-1/12">
        <NavLink to="/">
          <img src={logo} width={40} height={40} alt="logo UF" />
        </NavLink>
      </div>

      <div className="flex justify-center w-10/12">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${BaseClass} ${isActive ? ActiveClass : ''}`
          }
        >
          Accueil
        </NavLink>

        <NavLink
          to="/emploi_du_temps"
          className={({ isActive }) =>
            `${BaseClass} ${isActive ? ActiveClass : ''}`
          }
        >
          Emploi du temps
        </NavLink>

        <NavLink
          to="/classes"
          className={({ isActive }) =>
            `${BaseClass} ${isActive ? ActiveClass : ''}`
          }
        >
          Classes
        </NavLink>

        <NavLink
          to="/salles"
          className={({ isActive }) =>
            `${BaseClass} ${isActive ? ActiveClass : ''}`
          }
        >
          Salles
        </NavLink>

        <NavLink
          to="/professeurs"
          className={({ isActive }) =>
            `${BaseClass} ${isActive ? ActiveClass : ''}`
          }
        >
          Professeurs
        </NavLink>
      </div>

      <div className="w-1/12"></div>
    </div>
  );
};

export default Navbar;
