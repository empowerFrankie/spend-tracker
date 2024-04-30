import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <main className="flex min-h-full flex-col">
      <Header />

      <div className="mx-auto w-full max-w-7xl flex-grow p-8">
        {/* Render nested route component */}
        <Outlet />
      </div>
    </main>
  );
};
