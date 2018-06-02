import { push } from 'react-router-redux';

export const gotoUrl = url => {
  return dispatch => {
    dispatch(push(url));
  };
};
