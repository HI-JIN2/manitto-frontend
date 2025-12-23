const TOKEN_KEY = "token";

export const getToken = () => {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

