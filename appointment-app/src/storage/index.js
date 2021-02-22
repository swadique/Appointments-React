import LocalStorage from "./LocalStorage";

const storage = {
  authToken: LocalStorage("authToken"),
  user: LocalStorage("user"),
};

export default storage;
