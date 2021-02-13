/**
 * Implements necessary functions for interacting with local storage.
 */
function SessionStorage(key) {
  function getItem() {
    return JSON.parse(sessionStorage.getItem(key));
  }

  function setItem(value) {
    const val = JSON.stringify(value);
    sessionStorage.setItem(key, val);
  }

  function removeItem() {
    sessionStorage.removeItem(key);
  }

  function clear() {
    sessionStorage.clear();
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
}

export default SessionStorage;
