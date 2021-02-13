import SessionStorage from "./SessionStorage";
import LocalStorage from "./LocalStorage";

const storage = {
  authToken: LocalStorage("authToken"),
  user: SessionStorage("user"),
};

export default storage;
