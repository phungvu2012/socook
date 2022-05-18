export const setUser = (user) => {
  localStorage.setItem("userInfo", JSON.stringify(user));
}

export const getUser = () => {
  const userStr = localStorage.getItem("userInfo");
  if(userStr) return JSON.parse(userStr);
  else return null;
}

export const setToken = (token) => {
  localStorage.setItem("tokenAccess", token);
}

export const getToken = () => {
  const tokenStr = localStorage.getItem("tokenAccess") || null;
  return tokenStr;
}

export const setUserSession = (token, user) => {
  localStorage.setItem("tokenAccess", token);
  localStorage.setItem("userInfo", JSON.stringify(user));
}

export const removeUserSession = (token, user) => {
  localStorage.removeItem("tokenAccess", token);
  localStorage.removeItem("userInfo", user);
}

export const isActive = () => {
  const user = getUser();
  return user?.status === 1 ? true : false;
}