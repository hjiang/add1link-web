type ssmap = { [keys: string]: string | null };
export const saveToLocalStorage = (kvMap: ssmap) => {
  Object.entries(kvMap).forEach(([key, value]) => {
    value && window.localStorage.setItem(key, value);
  });
};

export const loadFromLocalStorage = (keys: string[]): ssmap => {
  const data: ssmap = {};
  keys.forEach((key) => {
    data[key] = window.localStorage.getItem(key);
  });
  return data;
};

export const loadUser = () => {
  const user = loadFromLocalStorage(['email', 'token']);
  if (Object.values(user).filter((v) => v).length == 2) {
    return user;
  } else {
    return null;
  }
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
