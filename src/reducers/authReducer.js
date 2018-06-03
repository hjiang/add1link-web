import {
  SAVE_AUTH_INFO,
  LOGOUT
} from '../constants/actionTypes';

import initialState from './initialState';

export default function authReducer(state = initialState.auth,
  action) {
  switch (action.type) {
    case SAVE_AUTH_INFO:
      return saveAuthInfo(state, action);
    case LOGOUT:
      return logout(state);
    default:
      return state;
  }
}

const saveAuthInfo = (state, action) => {
  const { user, token } = action;
  return { ...state, user, token };
};

function logout(state) {
  return { ...state, user: null, token: null };
}
