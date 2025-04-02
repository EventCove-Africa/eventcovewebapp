/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appUrls } from "../services/urls";
import { toast } from "react-hot-toast";
import { api } from "../services/api";
import {
  LoginProps,
  SignupProps,
  UserDetailsProviderProps,
  googleAuthProps,
} from "../types";
import {
  _handleClearCookiesAndSession,
  _handleThrowErrorMessage,
  setAuthCookies,
} from "../utils";

const UserContext = createContext({});

function UserDetailsProvider({ children }: UserDetailsProviderProps) {
  const [userDetails, setUserDetails] = useState({}) as any;
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();

  const login = async ({ payload, actions, from }: LoginProps) => {
    const login = appUrls.LOGIN_URL;
    const isTeamMember = payload?.eventId !== null;
    const login_url = isTeamMember ? `${login}/login/member` : login;
    try {
      const res = await api.post(login_url, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const { access_token, token_type, emailVerified, email } =
          res?.data?.data ?? null;
        if (!isTeamMember) {
          if (!emailVerified) {
            navigate(`/auth/signup?verifyOTP=${email}`, {
              replace: true,
            });
          } else {
            setAuthCookies({ access_token, token_type });
            navigate(from, {
              replace: true,
            });
            return;
          }
          return;
        }
        if (access_token) {
          setAuthCookies({ access_token, token_type, email });
          navigate(from, { replace: true });
        }
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      actions.setSubmitting(false);
      toast.error(err_message);
    }
  };

  const signup = async ({ payload, handleOpenClose, actions }: SignupProps) => {
    try {
      const res = await api.post(appUrls.CREATE_ORGANIZER_ACCOUNT_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const { emailVerified, access_token, token_type } =
          res?.data?.data ?? null;
        if (!emailVerified) {
          toast.success("Account created successfully");
          handleOpenClose?.();
        } else {
          setAuthCookies({ access_token, token_type });
          navigate("/app/home", {
            replace: true,
          });
        }
        actions.resetForm();
        actions.setSubmitting(false);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
      actions.setSubmitting(false);
    }
  };

  const handleAuthWithGoogle = async ({
    payload,
    handleOpenClose,
    setIsLoadingGoogle,
  }: googleAuthProps) => {
    try {
      const res = await api.post(appUrls.GOOGLE_USER_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const { emailVerified, access_token, token_type } =
          res?.data?.data ?? null;
        if (!emailVerified) {
          handleOpenClose?.();
        } else {
          setAuthCookies({ access_token, token_type });
          navigate("/app/home", {
            replace: true,
          });
        }
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleGetUserDetails = async () => {
    setLoadingDetails(true);
    try {
      const res = await api.get(appUrls.GET_USER_DETAILS_URL);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const results = res?.data?.data;
        setUserDetails(results);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
      _handleClearCookiesAndSession("access_token", "token_type", "email");
      navigate("/auth/login");
    } finally {
      setLoadingDetails(false);
    }
  };

  const logout = (query?: string) => {
    toast.success("Logout Successful");
    _handleClearCookiesAndSession("access_token", "token_type", "email");
    setUserDetails({});
    navigate(`/auth/login${query}`, { replace: true });
  };

  const value = useMemo(
    () => ({
      login,
      userDetails,
      setUserDetails,
      handleGetUserDetails,
      logout,
      signup,
      handleAuthWithGoogle,
      loadingDetails,
    }),
    [userDetails, loadingDetails, login, handleGetUserDetails, logout, signup]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a User Provider");
  }

  return context;
}

export { useUser, UserDetailsProvider };
