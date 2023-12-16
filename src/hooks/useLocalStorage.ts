const useLocalStorage = () => {
  /** 获取localStorage */
  const getLocalStorage = (key: any) => {
    const local: any = window.localStorage.getItem(key);
    if (local !== null) {
      return JSON.parse(local);
    }
  }
  /** 设置localStorage */
  const setLocalStorage = (key: any, value?: string) => {
    if (!value) return null;
    localStorage.setItem(key, JSON.stringify(value));
  }

  /** 删除指定localStorage */
  const delsingleLocalStorage = (key: any) => {
    if (!key) return null;
    window.localStorage.removeItem(key);
  };

  /** 清除所有localStorage */
  const clearLocalStorage = () => {
    window.localStorage.clear();
  };
  return { getLocalStorage, setLocalStorage, delsingleLocalStorage, clearLocalStorage }
};

export default useLocalStorage;
