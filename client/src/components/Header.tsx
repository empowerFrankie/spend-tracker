import logo from '@/assets/empower.svg';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="border-b border-black bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link to="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Empower Logo</span>
          <img className="h-8 w-auto" src={logo} alt="Empower Logo" />
        </Link>

        <div className="flex transition-all hover:text-empowerPinkDark">
          {/* navigation here */}
          <a href="#" className="text-sm font-semibold">
            Logout <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
