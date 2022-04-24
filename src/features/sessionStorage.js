export const getUser = () => {
  const userStr = sessionStorage.getItem("userInfo");
  if(userStr) return JSON.parse(userStr);
  else return null;
}

export const getToken = () => {
  const tokenStr = sessionStorage.getItem("tokenAccess") || null;
  return tokenStr;
}

export const setUserSession = (token, user) => {
  sessionStorage.setItem("tokenAccess", token);
  sessionStorage.setItem("userInfo", JSON.stringify(user));
}

export const removeUserSession = () => {
  sessionStorage.removeItem("tokenAccess");
  sessionStorage.removeItem("userInfo");
}