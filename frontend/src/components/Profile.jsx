import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { editUserDescriptionLink, getUserById } from '../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext';
import { GiTwoCoins } from "react-icons/gi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa6";
import { GiLaurelsTrophy } from "react-icons/gi";
import emptypicture from '../assets/emptypicture.png';
import i3 from '../assets/i3.JPG'
import i4 from '../assets/I4.JPG'
import i5 from '../assets/I5.JPG'
import i7 from '../assets/i7.JPG'
import i8 from '../assets/i8.JPG'
import i9 from '../assets/i9.JPG'

const storeItems = [
  { src: i7, name: 'Warrior' },
  { src: i3, name: 'Achiever' },
  { src: i5, name: 'Knight' },
  { src: i8, name: 'Rook' },
  { src: i9, name: 'Guardian' },
  { src: i4, name: 'Legend' }
]

const Profile = () => {

  const { user, setUser } = useContext(AuthContext);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${getUserById}/${id}`, { withCredentials: true });
      setProfile(res.data.user);
    } catch (error) {
      setError("Something went wrong. Please try again later")
    }
  }

  const editUserProfile = async (description) => {
    try {
      await axios.patch(`${editUserDescriptionLink}/${id}`, {
        description
      }, { withCredentials: true });
      fetchUserProfile();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, [id]);


  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6'>
      {profile ? (
        <div className='profile-card w-full max-w-6xl mx-auto rounded-2xl border border-gray-200 bg-white/80 backdrop-blur shadow-xl'>
          <div className='p-6 sm:p-8 lg:p-10 flex flex-col gap-8'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-10'>

              {/* Left */}
              <section className='flex flex-col gap-5 lg:w-2/5'>
                <div className='flex items-center gap-4'>
                  <Link to='/select/avatars'>
                    <img
                      src={profile?.profilePic}
                      className='w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover rounded-full border-4 border-white shadow-lg ring-2 ring-gray-200'
                      alt="Profile"
                    />
                  </Link>
                  <div className='min-w-0'>
                    <h3 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate'>{profile.name}</h3>
                    <p className='text-xs sm:text-sm text-gray-500'>Level {profile.level}</p>
                  </div>
                </div>

                <div className='rounded-xl bg-gray-50 border border-gray-200 p-4 sm:p-5'>
                  <p className='text-gray-700 text-sm sm:text-base leading-relaxed'>
                    {profile.description?.length > 0 ? profile.description : "No description provided"}
                  </p>

                  {profile._id === user?._id && !editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className='mt-4 w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition'
                    >
                      Edit
                    </button>
                  ) : editing && (
                    <div className='mt-4 flex flex-col gap-3 w-full'>
                      <textarea
                        value={profile.description || ""}
                        onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                        className='w-full min-h-[120px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                      ></textarea>
                      <div className='flex flex-col sm:flex-row gap-3'>
                        <button
                          onClick={() => { setEditing(false); editUserProfile(profile.description); }}
                          className='px-4 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition'
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(false)}
                          className='px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition'
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Right */}
              <section className='flex flex-col gap-5 lg:w-3/5 text-gray-700'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center gap-3'>
                    <BsFillLightningChargeFill className='text-blue-600 text-3xl' />
                    <div>
                      <p className='text-xs uppercase tracking-wide text-gray-500'>XP</p>
                      <p className='text-lg font-semibold text-gray-900'>{profile.xp}</p>
                    </div>
                  </div>
                  <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center gap-3'>
                    <GiLaurelsTrophy className='text-yellow-500 text-3xl' />
                    <div>
                      <p className='text-xs uppercase tracking-wide text-gray-500'>Bounties</p>
                      <p className='text-lg font-semibold text-gray-900'>{profile.bountiesClaimed}</p>
                    </div>
                  </div>
                  <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center gap-3'>
                    <FaFire
                      className='text-3xl text-orange-500'
                      style={{ filter: 'drop-shadow(0 0 4px #ff8635)' }}
                    />
                    <div>
                      <p className='text-xs uppercase tracking-wide text-gray-500'>Streak</p>
                      <p className='text-lg font-semibold text-gray-900'>{profile.streak}</p>
                    </div>
                  </div>
                  <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center gap-3'>
                    <GiTwoCoins className='text-yellow-400 text-3xl' />
                    <div>
                      <p className='text-xs uppercase tracking-wide text-gray-500'>Coins</p>
                      <p className='text-lg font-semibold text-gray-900'>{profile.coins}</p>
                    </div>
                  </div>
                </div>

                <div className='rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-5 flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Current Level</p>
                    <p className='text-2xl font-semibold text-gray-900'>Level {profile.level}</p>
                  </div>
                  <div className='w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow'>
                    {profile.level}
                  </div>
                </div>
              </section>
            </div>

            {/* Bottom */}
            <section className='flex flex-col gap-4 text-gray-700 border-t pt-6'>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-lg text-gray-900">Assets</p>
                {profile.assets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    {profile.assets.map((assetName, index) => (
                      <div key={index} className="flex justify-center items-center">
                        {storeItems.find(item => item.name === assetName) ? (
                          <img className="w-full h-48 object-contain rounded-md"
                            src={storeItems.find(item => item.name === assetName).src} alt={assetName}/>
                        ) : (
                          <span className="text-sm text-gray-500 italic">This asset may have been removed
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No assets yet</p>
                )}
              </div>
              <div className='rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between'>
                <div className='flex gap-1 justify-center items-center'>
                  <p className='text-lg text-gray-900'>Total Issues Solved: </p>
                  <p className='text-xl font-semibold text-gray-900'>
                    {profile?.completedProblems ? profile.completedProblems.length : 0}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <p className='text-red-500 font-medium text-center'>{error}</p>
      )}
    </div>
  )
}

export default Profile