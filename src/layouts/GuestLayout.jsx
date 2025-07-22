import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default GuestLayout;