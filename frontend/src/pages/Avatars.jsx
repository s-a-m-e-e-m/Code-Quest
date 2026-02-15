import React from 'react'
import axios from 'axios'
import { getAllAvatarsLink, updateUserAvatarLinkPrefix, updateUserAvatarLinkSuffix } from '../utils/links'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Avatars = () => {

    const [avatars, setAvatars] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchAllAvatars = async () => {
        try {
            const res = await axios.get(getAllAvatarsLink, { withCredentials: true });
            setAvatars(res.data.avatars);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again later");
        }
    }

    const updateUserAvatar = async (avatar) => {
        try {
            await axios.put(`${updateUserAvatarLinkPrefix}/${user._id}/${updateUserAvatarLinkSuffix}`, { avatar }, { withCredentials: true });
            navigate(`/profile/${user._id}`);
            toast.success("Avatar updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update avatar. Please try again later");
        }
    }

    useEffect(() => {
        fetchAllAvatars();
    }, [])
    return (
        <div className="w-[80vw] mx-auto mt-10 pb-10">
            <Toaster position="top-right" />
            {avatars.length > 0 ? (
                <>
                <h2 className="text-3xl font-semibold mb-6 text-center">Select Your Avatar</h2>
                <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]">
                    {avatars.map((avatar, idx) => (
                        <div key={idx} className="flex justify-center">
                            <img
                                className="w-24 h-24 cursor-pointer hover:brightness-110 hover:scale-105 rounded-full border-4 border-gray-300 object-cover"
                                src={avatar.imageUrl}
                                alt={`avatar-${idx}`} onClick={()=>updateUserAvatar(avatar.imageUrl)}/>
                        </div>
                    ))}
                </div>
                </>
            ) : (
                <p className="text-red-600 text-lg">{error}</p>
            )}
        </div>
    )
}

export default Avatars
