import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar className="w-full h-full md:w-1/3 h-[120vh] bg-white shadow-md p-6" />

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-6 space-y-8">
        <section className="text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold">
            The CodeQuest: Hunt the Bugs. Claim the Bounty.
          </h3>
          <p className="mt-4 mb-4 text-gray-700 leading-relaxed">
            The world's first real-time debugger arena. Step into the shoes of a Code Medic,
            solve real-world technical debt, and climb the global leaderboard for legendary rewards.
          </p>

          <Link to="/allissues" className="p-1 mr-2 mt-6 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
            Enter the Arena
          </Link>
          <Link to="/store" className="p-1 md:hidden mr-2 mt-6 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200">Store</Link>
          <Link to="/leaderboard/bounty" className="p-1 m-2 mt-6 rounded-md md:hidden text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200">Leaderboard</Link>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">How It Works</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">The Assignment</th>
                  <th className="border border-gray-300 px-4 py-2">The Fix</th>
                  <th className="border border-gray-300 px-4 py-2">The Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:px-4 sm:py-3">
                    Browse a live feed of 'broken' code snippets. From missing semicolons to logical nightmares,
                    choose a bounty that matches your skill level.
                  </td>
                  <td className="border border-gray-300 p-1 sm:px-4 sm:py-3">
                    Use our integrated terminal to refactor the code. No local setup required—just you, the editor, and the bug.
                  </td>
                  <td className="border border-gray-300 p-1 sm:px-4 sm:py-3">
                    Be the first to push the fix and claim the bounty. Earn Coins to spend in the Vault and XP to increase your rank.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 id='about' className="text-xl font-semibold text-center text-gray-800 mb-2">About CodeQuest</h3>
          <p className="text-gray-700 leading-relaxed">
            We believe that the best way to learn code is to fix it. CodeQuest is built for developers who
            find algorithms boring but love the 'Aha!' moment of finding a typo. Our mission is to turn the
            frustration of technical debt into a competitive sport, helping the next generation of engineers
            master the art of debugging through gamified practice.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Why Use CodeQuest</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Live Bounties:</strong> Real-time competition. If someone fixes a bug before you, the bounty is gone.</li>
            <li><strong>Zero Setup:</strong> Code directly in the browser with our Monaco-powered editor. No npm install required.</li>
            <li><strong>Daily Streaks:</strong> Solve one bug every 24 hours to maintain your multiplier and earn bonus coins.</li>
            <li><strong>The Vault:</strong> Spend your hard-earned bounty on exclusive badges, profile auras, and pro editor themes.</li>
          </ul>
          <p className="mt-4 mb-4 text-gray-700 font-medium">
            Start your quest today and prove you're the fastest debugger in the dev-sphere.
          </p>
          <div className='flex  mx-auto '>
          <Link
            to="/allissues"
            className="p-1 mx-auto text-center text-md rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 w-[10rem]">
            Start
          </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home