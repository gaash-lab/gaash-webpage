import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  csrfToken: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_CSRF_TOKEN':
      return { ...state, csrfToken: action.payload };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('token');
        if (token) {
          const response = await authAPI.getMe();
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: response.data.admin },
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_ERROR' });
        Cookies.remove('token');
      }
    };

    checkAuth();
  }, []);

  // Get CSRF token on app load
  useEffect(() => {
    const getCSRFToken = async () => {
      try {
        const response = await authAPI.getCSRFToken();
        dispatch({
          type: 'SET_CSRF_TOKEN',
          payload: response.data.csrfToken,
        });
      } catch (error) {
        console.error('Failed to get CSRF token:', error);
      }
    };

    getCSRFToken();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      
      // Set token in cookie
      Cookies.set('token', response.data.token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.data.admin },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      const response = await authAPI.updatePassword(passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword({ email });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const response = await authAPI.resetPassword(token, { password });
      
      // Set token in cookie
      Cookies.set('token', response.data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.data.admin },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    logout,
    updatePassword,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};