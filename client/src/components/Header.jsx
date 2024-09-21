import  { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword: urlKeyword } = useParams();

  const [logoutApi] = useLogoutMutation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const renderProfileButton = () => (
    <>
      <button
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="text-white flex items-center hover:text-gray-400"
      >
        <FiUser className="mr-1" />
        {userInfo?.name}
        {isProfileMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <ul
        className={`absolute ${
          isProfileMenuOpen ? "block" : "hidden"
        } bg-gray-800 p-2 mt-2 space-y-2 text-white border rounded-md z-10`}
      >
        <li>
          <Link to="/profile" className="flex items-center hover:text-gray-400">
            <FiUser className="mr-1" />
            Profile
          </Link>
        </li>
        <li>
          <Link
            onClick={handleLogout}
            className="flex items-center hover:text-gray-400"
          >
            <FiLogOut className="mr-1" />
            Logout
          </Link>
        </li>
      </ul>
    </>
  );

  const renderAdminButton = () => (
    <>
      <button
        onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
        className="text-white flex items-center hover:text-gray-400"
      >
        <FiUser className="mr-1" />
        Admin
        {isAdminMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <ul
        className={`absolute ${
          isAdminMenuOpen ? "block" : "hidden"
        } bg-gray-800 p-2 mt-2 space-y-2 text-white border rounded-md z-10`}
      >
        <li>
          <Link to="/admin/users" className="hover:text-gray-400">
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="hover:text-gray-400">
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="hover:text-gray-400">
            Orders
          </Link>
        </li>
      </ul>
    </>
  );

  const renderSignInButton = () => (
    <Link className="flex items-center" to="/login">
      <FiLogIn className="mr-1 text-white" />
      <button className="text-white hover:text-gray-400">Sign In</button>
    </Link>
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 shadow-lg h-30 items-center justify-center">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.u4ACMt9596m8E_EEGJsASQHaHa&pid=Api&P=0&h=180"
              alt="Amazon Logo"
              className="w-10 h-10 mr-2" // Adjust size here
            />
          </Link>
          <div className="text-white text-3xl font-extrabold">Amazon</div>
        </div>
        <div className="hidden sm:flex items-center space-x-4 font-bold text-2xl">
          <input
            type="text"
            placeholder="Search"
            className="ml-4 p-2 rounded-md bg-gray-700 text-white hidden sm:block"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md hidden sm:block ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
          <Link
            to="/"
            className="text-white flex items-center hover:text-gray-400"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="text-white flex items-center hover:text-gray-400"
          >
            <FiShoppingCart className="mr-1" />
            Cart
            <span className="bg-blue-700 text-white rounded-full px-2 py-1 ml-2">
              {/* Add a fallback in case cartItems is undefined */}
              {cartItems?.length || 0}
            </span>
          </Link>

          {userInfo && (
            <div className="relative group">{renderProfileButton()}</div>
          )}
          {userInfo?.isAdmin && (
            <div className="relative group">{renderAdminButton()}</div>
          )}
          {!userInfo && renderSignInButton()}
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mt-4 sm:hidden bg-gray-800 p-4 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-md bg-gray-700 text-white w-full mb-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full mb-2"
            onClick={handleSearch}
          >
            Search
          </button>
          <div className="space-y-2">
            <Link
              to="/cart"
              className="text-white flex items-center hover:text-gray-400"
            >
              <FiShoppingCart className="mr-1" />
              Cart
              <span className="bg-blue-700 text-white rounded-full px-2 py-1 ml-2">
                {cartItems?.length || 0}
              </span>
            </Link>
            {userInfo && (
              <div className="relative group">{renderProfileButton()}</div>
            )}
            {userInfo?.isAdmin && (
              <div className="relative group">{renderAdminButton()}</div>
            )}
            {!userInfo && renderSignInButton()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
