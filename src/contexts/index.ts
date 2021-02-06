import React from 'react';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage
} from '../utils/localStorage';

const { email, token } = loadFromLocalStorage(['email', 'token']);

export interface AuthState {
  user: { email: string | null } | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  user: email ? { email } : null,
  token: token
};

export const saveAuthState = (authState: AuthState): AuthState => {
  if (authState.user && authState.user.email && authState.token) {
    saveToLocalStorage({ email: authState.user.email, token: authState.token });
  } else {
    console.error(`Invalid auth state: ${authState}`);
  }
  return authState;
};

export const clearAuthState = (): AuthState => {
  clearLocalStorage();
  return { user: null, token: null };
};

export const AuthContext = React.createContext(initialAuthState);
