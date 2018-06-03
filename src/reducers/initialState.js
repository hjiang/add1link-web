import {loadFromLocalStorage} from '../utils/localStorage';

const { email, token } = loadFromLocalStorage(['email', 'token']);

export default {
  auth: {
    user: email ? { email } : null,
    token: token
  }
};
