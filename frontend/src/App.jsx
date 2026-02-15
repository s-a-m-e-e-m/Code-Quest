import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignUp from './auth/SignUp'
import Login from './auth/Login'
import Home from './pages/Home'
import Problems from './pages/Problems'
import Problem from './pages/Problem'
import BountyLeaderboard from './pages/BountyLeaderboard'
import StreakLeaderboard from './pages/StreakLeaderboard'
import Profile from './components/Profile'
import Store from './pages/Store'
import Footer from './components/Footer'
import Avatars from './pages/Avatars'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/allissues' element={<Problems />} />
        <Route path='/issue/:id' element={<Problem />} />
        <Route path='/leaderboard/bounty' element={<BountyLeaderboard />} />
        <Route path='/leaderboard/streak' element={<StreakLeaderboard />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/store' element={<Store />} />
        <Route path='/select/avatars' element={<Avatars />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

