import * as types from '../constants/actionTypes';

export function saveAuthInfo(user, token) {
  return { type: types.SAVE_AUTH_INFO, user, token };
}

export function logout() {
  return { type: types.LOGOUT};
}
