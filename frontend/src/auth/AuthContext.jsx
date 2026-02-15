import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'
import { getUser } from '../utils/links';
import { useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        try {
            const res = await axios.get(getUser, { withCredentials: true })
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}