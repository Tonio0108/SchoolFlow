import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // adapte selon ton chemin

const Navbar = () => {
  const baseClass = 'me-10 transition hover:text-emerald-600';
  const activeClass = 'text-emerald-600 font-bold';

  return (
    <div className="w-full h-15 shadow-lg p-2 px-5 flex justify-between items-center">
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
            `${baseClass} ${isActive ? activeClass : ''}`
          }
        >
          Accueil
        </NavLink>

        <NavLink
          to="/emploi"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ''}`
          }
        >
          Emploi du temps
        </NavLink>

        <NavLink
          to="/classes"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ''}`
          }
        >
          Classes
        </NavLink>

        <NavLink
          to="/salles"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ''}`
          }
        >
          Salles
        </NavLink>

        <NavLink
          to="/professeurs"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ''}`
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
