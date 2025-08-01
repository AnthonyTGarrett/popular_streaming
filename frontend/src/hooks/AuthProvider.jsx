import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  let decoded = '';

  const loginAction = async data => {
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (typeof res === 'string') {
        decoded = jwtDecode(res);
      } else {
        return res;
      }

      if (decoded) {
        setUser(decoded.userId);
        setToken(res);
        localStorage.setItem('user', decoded.userId);
        localStorage.setItem('token', `Bearer ${res}`);
        navigate('/dashboard');
        setIsLoggedIn(true);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      return err;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
