/* global window */
export const saveToLocalStorage = (kvMap) => {
  Object.entries(kvMap).forEach(([key, value]) => {
    window.localStorage.setItem(key, value);
  });
};

export const loadFromLocalStorage = (keys) => {
  let data = {};
  keys.forEach(key => {
    data[key] = window.localStorage.getItem(key);
  });
  return data;
};

export const loadUser = () => {
  const user = loadFromLocalStorage(['email', 'token']);
  if (Object.values(user).filter(v => v).length == 2) {
    return user;
  } else {
    return null;
  }
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
