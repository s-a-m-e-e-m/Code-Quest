import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendOtpLink, signup, verifyOtpLink } from '../utils/links';
import { AuthContext } from './AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [cooldown, setCooldown] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (verified || !timerActive) return;
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (cooldown === 0) {
      setTimerActive(false);
    }
  }, [cooldown, timerActive, verified]);

  const sendOtp = async () => {
    if (verified) return;

    try {
      setLoading(true);
      const email = document.querySelector("input[name='email']").value;
      await axios.post(sendOtpLink, {
        email
      }, { withCredentials: true });

      toast.success('Otp sent to your email check the spam folder if not found in inbox');
      setOtpSent(true);
      setCooldown(60);
      setTimerActive(true);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send otp")
    }
  }

  const verifyOtp = async (e) => {
    if (verified) return;

    try {
      const email = document.querySelector("input[name='email']").value;
      const otp = document.querySelector("input[name='otp']").value;

      await axios.post(verifyOtpLink, {
        email,
        otp
      }, { withCredentials: true });

      toast.success('Email verified');
      setVerified(true);
      setTimerActive(false)
      setCooldown(0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Otp verification failed")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      const res = await axios.post(signup, {
        name,
        email,
        password
      }, { withCredentials: true });

      setUser(res.data.user);
      toast.success("Signup successfull!")
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className='flex flex-col w-[90%] sm:max-w-md mx-auto align-middle mt-10 p-6 mb-10 border border-gray-300 rounded-md shadow-md'>
      <Toaster position="top-center" />
      <h1 className='text-2xl font-bold text-center'>Create your account</h1>
      <p></p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 border bg-gray-100 border border-gray-400 pb-4 mt-4 rounded-md'>
        <div className='flex flex-col m-4 gap-2'>
          <label htmlFor="name" className='font-semibold'>Name</label>
          <input type="text" name='name' placeholder='Enter your name' className='border border-gray-400 mb-4 rounded-md p-1' />
          <label htmlFor="email" className='font-semibold'>Email</label>
          <input type="email" name='email' disabled={verified} placeholder='Enter your email address' className='border border-gray-400 mb-4 rounded-md p-1' />
          {!otpSent && (
            <button type='button' onClick={sendOtp} className='bg-blue-500 hover:bg-blue-600 cursor-pointer p-1 text-white rounded-md'>Send OTP </button>
          )}
          {otpSent && !verified && (
            <button disabled={cooldown > 0 || verified} onClick={sendOtp} className='bg-blue-500 hover:bg-blue-600 cursor-pointer p-1 text-white rounded-md'>
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
            </button>
          )}

          {otpSent && !verified && (
            <div className=''>
              <input type='text' name='otp' className='border border-gray-400 mb-4 rounded-md p-1 mr-2' placeholder='Enter OTP' />
              <button type='button' onClick={verifyOtp} className='bg-blue-500 hover:bg-blue-600 cursor-pointer p-1 text-white rounded-md'>Verify OTP</button>
            </div>
          )}
          <label htmlFor="password" className='font-semibold'>Password</label>
          <input type="password" name='password' placeholder='Enter your password' className='border border-gray-400 mb-4 rounded-md p-1' />
          <button type='submit' className={`bg-blue-500 p-1 text-white rounded-md ${!verified ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 cursor-pointer'}`} disabled={!verified}>Submit</button>
        </div>

        <p className='text-center'>Already have an account? <Link to={'/signin'} className='text-blue-700'>Sign In</Link></p>
      </form>
    </div>
  )
}

export default SignUp