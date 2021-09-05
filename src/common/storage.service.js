export const getItem = (key) => {
    return window.localStorage.getItem(key);
  };
  
  export const saveItem = (key,token) => {
    window.localStorage.setItem(key, JSON.stringify(token));
  };
  
  export const removeItem = (key) => {
    window.localStorage.removeItem(key);
  };
  
  export default { getItem, saveItem, removeItem };
  