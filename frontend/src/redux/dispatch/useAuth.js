import { useSelector, useDispatch } from 'react-redux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from '../features/userSlice';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);

  const dispatch = useDispatch();

  const setAuth = (user, token) => {
    dispatch(loginSuccess({ user, token }));
  };

  const signup = async (userName, email, phone, password) => {
    dispatch(loginStart());
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username: userName,
        email,
        password,
        phone,
      });

      setCookie('auth_token', res.data.token, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      toast.success('Account created successfully');
      return true;
    } catch (err) {
      dispatch(loginFailure());
      toast.error(err.response.data);
      console.log(err.data);
      return false;
    }
  };

  const login = async (email, password) => {
    dispatch(loginStart());
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password,
      });

      setCookie('auth_token', res.data.token, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      toast.success('Login Successful');

      return true;
    } catch (err) {
      toast.error(err.response.data);
      dispatch(loginFailure());
      return false;
    }
  };

  const refershToken = async () => {
    dispatch(loginStart());
    try {
      if (!cookies.auth_token) {
        dispatch(loginFailure());
        return;
      }

      const res = await axios.post(
        'http://localhost:5000/api/auth/token',
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );

      setCookie('auth_token', res.data.token, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
    } catch (err) {
      console.log(err);
      dispatch(loginFailure());
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        {
          email,
        }
      );
      toast.success(res.data);
      return true;
    } catch (err) {
      toast.error(err.response.data);
      return false;
    }
  };

  const resetPassword = async (email, newPassword, otp) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/reset-password',
        {
          email,
          newPassword,
          otp,
        }
      );
      toast.success(res.data);
      return true;
    } catch (err) {
      toast.error(err.response.data);
      return false;
    }
  };

  const logoutUser = () => {
    removeCookie('auth_token', { path: '/' });
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  return {
    auth,
    login,
    signup,
    logoutUser,
    refershToken,
    setAuth,
    forgotPassword,
    resetPassword,
  };
};

export default useAuth;
