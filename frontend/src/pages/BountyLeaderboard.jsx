import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { bountyLeaderBoardLink, streakLeaderBoardLink } from '../utils/links';
import LeaderboardNavigation from './LeaderboardNavigation';
import { AuthContext } from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Leaderboard = () => {

  const { user } = useContext(AuthContext);

  const [bountyLeaderboard, setBountyLeaderboard] = useState([]);
  const [error, setError] = useState("");

  const fetchLeaderBoard = async () => {
    try {
      const res = await axios.get(bountyLeaderBoardLink, { withCredentials: true });
      setBountyLeaderboard(res.data.data);
    } catch (error) {
      setError("Error in fetching results. Please try later");
    }
  }

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  return (
    <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
      <Sidebar className="w-full md:w-1/3 hidden h-[150vh] md:block" />

      <div className='w-full md:w-2/3 p-5 md:p-10 flex flex-col items-center'>
        <LeaderboardNavigation />

        <div className="flex flex-col gap-4 w-full">
          {bountyLeaderboard.length > 0 ? (
            <div className='flex flex-col'>

              {!user && (
                <p className="text-red-500 text-center font-semibold">
                  <a href="/signin" className="underline text-blue-600">Sign in</a> into your account to view your standing in the leaderboard
                </p>
              )}

              <div className='grid grid-cols-3 sm:grid-cols-5 items-center p-4 rounded-lg bg-white hover:bg-gray-50'>
                <h1 className='text-lg font-bold text-gray-900 flex items-center gap-2'>Rank</h1>
                <h1 className='flex items-center gap-2 text-gray-900 font-medium col-span-1 sm:col-span-2'>Username</h1>
                <h1 className='text-gray-800 text-center col-span-1 sm:block'>Bounties</h1>
                <h1 className='text-gray-800 text-center hidden sm:block'>Streak</h1>
              </div>

              {bountyLeaderboard.map((item, i) => (
                <Link key={i} to={`/profile/${item._id}`}
                  className={`rounded-lg shadow-md transition-transform transform hover:scale-95 sm:hover:scale-98 ${user && user._id === item._id ? "border-2 border-green-400" : "border border-gray-200"}`}>

                  <div className={`grid grid-cols-3 sm:grid-cols-5 items-center p-4 rounded-lg ${user && user._id === item._id ? "bg-green-100 hover:bg-green-200" : "bg-white hover:bg-gray-50"}`}>

                    <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                      {i + 1} {i === 0 ? " 🥇" : i === 1 ? " 🥈" : i === 2 ? " 🥉" : null}
                    </h1>

                    <h1 className="flex items-center gap-2 text-gray-800 font-medium col-span-1 sm:col-span-2">
                      {item.name} {user && user._id === item._id && (
                        <span className="text-sm text-green-600 font-semibold">(You)</span>
                      )}
                    </h1>

                    <h1 className="text-gray-600 text-center col-span-1 sm:block">
                      {item.bountiesClaimed}
                    </h1>
                    <h1 className="text-gray-600 text-center hidden sm:block">
                      {item.streak}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          )
            :
            <p>{error}</p>
          }

        </div>
      </div>
    </div>
  );
}

export default Leaderboard