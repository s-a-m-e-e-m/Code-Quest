import { useEffect, useState } from 'react'
import FullLogo from '../assets/FullLogo.png'
import emptyPicture from '../assets/emptypicture.png'
import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { logoutLink } from '../utils/links'
import toast, { Toaster } from 'react-hot-toast'
import { GiTwoCoins } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

  const { user, setUser } = useContext(AuthContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const deleteCookie = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  useEffect(() => {
    return () => {
      deleteCookie();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete(logoutLink, { withCredentials: true });
      setUser(null);
      toast.success("Logout successful");

      deleteCookie(); 
      navigate('/');

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "logout failed")
    }
  }

  return (
    <nav className="z-20 flex justify-between items-center px-5 bg-white shadow-md h-20">
      <Toaster position="top-center" />

      <Link to="/" className="flex items-center gap-2">
        <img src={FullLogo} alt="logo" className="rounded-md max-h-[4.5rem] max-w-[14rem]"/>
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-6">
            
            <div className="hidden sm:flex items-center gap-2 bg-green-500/90 text-white px-4 py-2 rounded-full shadow-sm hover:scale-105 transition">
              <GiTwoCoins className="text-xl text-yellow-300" />
              <span className="font-semibold">Coins</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                {user.coins}
              </span>
            </div>

            <div>
              <GiHamburgerMenu className="text-3xl md:hidden text-gray-700 cursor-pointer hover:text-gray-900 transition" onClick={() => setShowMobileMenu((prev) => !prev)} />
              {showMobileMenu && (
                <div className="absolute top-20 right-5 bg-white border border-gray-200 rounded-md shadow-lg p-4 flex flex-col gap-4">
                  <Link to={`/profile/${user._id}`} className="text-gray-700 hover:text-gray-900 transition" onClick={() => setShowMobileMenu(false)}>Profile</Link>
                  <button onClick={() => { handleLogout(); setShowMobileMenu(false); }} className="text-red-500 hover:text-red-700 transition text-left">Logout</button>
                </div>
              )}
            </div>

            <div className={`hidden md:flex items-center gap-2 bg-yellow-400/90 text-white px-4 py-2 rounded-full shadow-sm hover:scale-105 transition`}>
              <span className="text-gray-700 font-medium">Level</span>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-md">
                {user.level || 1}
              </div>
            </div>

            <Link to={`/profile/${user._id}`} className={`hidden md:block`}>
              <img src={user?.profilePic || emptyPicture} alt="profile"
                className="h-14 w-14 rounded-full border-2 border-gray-200 hover:border-blue-500 transition"/>
            </Link>

            <button onClick={handleLogout}
              className={`hidden md:block text-md rounded-md bg-red-500 p-1 text-white hover:bg-red-600 font-medium`}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/signup" className="text-md rounded-md bg-blue-500 p-1 text-white hover:bg-blue-600 font-medium">
            Signup
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
