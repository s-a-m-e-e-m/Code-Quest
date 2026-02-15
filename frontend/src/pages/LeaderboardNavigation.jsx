import React from 'react'
import { NavLink } from 'react-router-dom'

const LeaderboardNavigation = () => {
  return (
    <div className='flex gap-4 mb-4'>
      <NavLink to={'/leaderboard/bounty'} end
      className={({ isActive }) => `p-1 rounded-md md:text-lg cursor-pointer ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-200"}`
      } >
        Bounty Leaderboard
      </NavLink>

      <NavLink to={'/leaderboard/streak'} end
      className={({ isActive }) => `p-1 rounded-md md:text-lg cursor-pointer ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-200"}`}>
        Streak Leaderboard
      </NavLink>
    </div>
  )
}

export default LeaderboardNavigation
