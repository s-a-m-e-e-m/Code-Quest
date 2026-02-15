import React, { useContext } from 'react'
import i3 from '../assets/i3.JPG'
import i4 from '../assets/i4.JPG'
import i5 from '../assets/i5.JPG'
import i7 from '../assets/i7.JPG'
import i8 from '../assets/i8.JPG'
import i9 from '../assets/i9.JPG'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { storeLink } from '../utils/links'
import { GiTwoCoins } from "react-icons/gi";
import toast, { Toaster } from 'react-hot-toast'
import { AuthContext } from '../auth/AuthContext'

const storeItems = [
  { src: i7, price: 50, icon: <GiTwoCoins />, name: 'Warrior' },
  { src: i3, price: 75, icon: <GiTwoCoins />, name: 'Achiever' },
  { src: i5, price: 100, icon: <GiTwoCoins />, name: 'Knight' },
  { src: i8, price: 125, icon: <GiTwoCoins />, name: 'Rook' },
  { src: i9, price: 150, icon: <GiTwoCoins />, name: 'Guardian' },
  { src: i4, price: 200, icon: <GiTwoCoins />, name: 'Legend' }
]

const Store = () => {

  const { user } = useContext(AuthContext);

  const handlePurchase = async (itemPrice, itemName) => {
    try {
      await axios.post(storeLink, {
        itemPrice, itemName, userId: user._id
      }, { withCredentials: true });
      toast.success("Item purchased successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to purchase the item")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <Sidebar className="hidden md:block md:w-1/3 h-[150vh] bg-gray-100 shadow-md" />

      <div className="w-full mx-auto md:w-2/3 p-6">
        <h1 className="text-3xl font-bold text-center mb-2">Store</h1>
        <h2 className="text-lg text-center text-gray-600 mb-4">
          Use your coins to buy exclusive badges
        </h2>
        <p className="text-center text-gray-500 mb-8">More features coming soon!</p>

        <div className="max-w-[90vh] md:max-w-[70vh] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {storeItems.map((item, i) => (
            <div key={i} className="flex flex-col gap-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg items-center">
              <img className="w-full h-48 object-contain rounded-md"
                src={item.src} alt={item.name}/>
              <div className="flex w-full justify-between items-center">
                <p className="flex gap-1 items-center bg-gray-100 px-3 py-1 rounded-md text-sm font-medium">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-gray-800">{item.price}</span>
                  <span className="text-yellow-400 text-lg">{item.icon}</span>
                </p>
                <button className="px-4 py-2 text-sm font-semibold text-white rounded-md bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                  onClick={() => handlePurchase(item.price, item.name)} disabled={!user || user.coins < item.price}>
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Store