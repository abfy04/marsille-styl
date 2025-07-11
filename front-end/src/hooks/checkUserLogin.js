// src/hooks/useLogin.js

import api from '../axios/api';




export const checkUserLogin = async (loginData) => {
    try {
        const { data } = await api.post('/login', loginData);
        return data;
        
    } catch (error) {
        throw error.response?.data || error;
        
        
    }

};

export const fetchLoggedUser = async () => {
    const Data = JSON.parse(localStorage.getItem('data'));
    try {
        const { data } = await api.get('/me',{
            Headers : {
                Authorization :`Bearer ${Data.token}`
            }
        });
        return data;
        
    } catch (error) {
        throw error.response?.data || error;  
    }
}

