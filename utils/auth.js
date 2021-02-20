import { useState, useEffect, useContext, createContext } from 'react';
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
  const [user, setUser] = useState(null);

  const getAccountDetail = async () => {
    try {
      const res = await axios.get('/api/account');
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      const account = await getAccountDetail();
      setUser(account);
    })();
  }, []);

  const getApprovedRequestToken = async () => {
    const res = await axios.get('/api/authentication');
    const requestToken = res.data.request_token;
    location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${process.env.NEXT_PUBLIC_BASE_URL}/login`;
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
        const account = await getAccountDetail();
        setUser(account);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    const res = await axios.delete('/api/authentication');
    const data = res.data;

    if (data.success) setUser(null);
  };

  return {
    user,
    getApprovedRequestToken,
    createSession,
    logout,
  };
}
