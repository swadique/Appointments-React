/**
 * Implements necessary functions for interacting with local storage.
 */
function LocalStorage(key) {
  function getItem() {
    return JSON.parse(localStorage.getItem(key));
  }

  function setItem(value) {
    const val = JSON.stringify(value);
    localStorage.setItem(key, val);
  }

  function removeItem() {
    localStorage.removeItem(key);
  }

  function clear() {
    localStorage.clear();
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
}

export default LocalStorage;
