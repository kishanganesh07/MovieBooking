import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col space-y-4">
          <Link
            to="/admin"
            className="hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/bookings"
            className="hover:text-blue-600 font-medium"
          >
            Bookings
          </Link>

          <Link
            to="/admin/movies"
            className="hover:text-blue-600 font-medium"
          >
            Movies
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
