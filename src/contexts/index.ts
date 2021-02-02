import React from 'react';
import { loadFromLocalStorage } from '../utils/localStorage';

const { email, token } = loadFromLocalStorage(['email', 'token']);

export interface AuthState {
  user: { email: string | null } | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  user: email ? { email } : null,
  token: token
};

export const AuthContext = React.createContext(initialAuthState);
