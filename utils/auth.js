import { useState, useEffect, useContext, createContext } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const getApprovedRequestToken = async () => {
    const res = await axios.get('/api/authentication');
    const requestToken = res.data.request_token;
    location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/login`;
  };

  const createSession = async (approvedStatus, requestToken) => {
    if (!requestToken || approvedStatus !== 'true') {
      console.error('Request token not approved!');
      return;
    }

    try {
      const res = await axios.post('/api/authentication', {
        approvedRequestToken: requestToken,
      });
      const data = res.data;

      if (data.success) {
        cookie.set('session_id', data.session_id);
      }
      console.log('success!!!');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    const res = await axios.delete('/api/authentication');
    const data = res.data;

    if (data.success) {
      cookie.remove('session_id');
      console.log('Delete session success!');
    }
  };

  return {
    user,
    getApprovedRequestToken,
    createSession,
    logout,
  };
}
