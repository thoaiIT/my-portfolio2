import Logo from '@/assets/imgs/logo.png';
import { paths } from '@/routes/paths';
import { NavLink } from 'react-router-dom';

const NavLogo = () => {
  return (
    <div className="flex justify-center my-4">
      <NavLink
        to={paths.admin.dashboard}
        className="bg-black rounded-full max-w-12 min-w-8"
      >
        <img src={Logo} alt="Logo" />
      </NavLink>
    </div>
  );
};

export default NavLogo;
