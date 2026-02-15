import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="hidden md:flex w-64 bg-gray-100  shadow-lg flex-col justify-between p-6">
      <div className="flex flex-col gap-4">
        <Link to="/" className="px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 transition-colors duration-200">Home</Link>
        <Link to="/store" className="px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 transition-colors duration-200">Store</Link>
        <Link to="/leaderboard/bounty" className="px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 transition-colors duration-200">Leaderboard</Link>
      </div>

      <div className="flex items-center gap-4 mt-10 border-t border-gray-700 pt-6">
        <div className="flex flex-col">
          {user ? (
            <Link to={`/profile/${user._id}`} className="hover:text-blue-400 transition-colors duration-200 flex gap-2">
              <img src={user?.profilePic} alt="profile"
                className="h-14 w-14 rounded-full border-2 border-gray-200 hover:border-blue-500 transition" />
              <div className='flex flex-col gap-1'>
              <p className="font-semibold">{user.name}</p>
              <span className="text-sm text-gray-400">View profile</span>
              </div>
            </Link>
          ) : (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
              <Link to="/signup">Create your account</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
