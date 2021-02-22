import React from "react";
import storage from "../storage";

const UserContext = React.createContext(storage.user.getItem() || {});
export default UserContext;
