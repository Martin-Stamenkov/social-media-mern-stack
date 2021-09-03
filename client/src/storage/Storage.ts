class Storage {
  getItem(key: string) {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    setTimeout(() => localStorage.clear(), 3600000)
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export const storage = new Storage();
