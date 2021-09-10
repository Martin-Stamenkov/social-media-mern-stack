class Storage {
  getItem(key: string) {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export const storage = new Storage();
