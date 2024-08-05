// import { atomWithStorage } from "jotai/utils";
// import { sessionStore } from "../store/jotaiStore";
import api from "../axios/axiosConfig";
import { jotaiSessionStore } from "../store/jotaiStore";

// const tokenStore = atomWithStorage("token", null, sessionStore);
// const userToken = atomWithStorage("user", null, sessionStore);
// const isAuthentication = atomWithStorage(
//   "isAuthenticated",
//   false,
//   sessionStore
// );
// const email = atomWithStorage("email", null, sessionStore);

interface AuthProviderInterface {
  isAuthenticated: boolean;
  email: null | string;
  password: null | string;
  signin(email: any, password: any): Promise<void>;
  signout(): Promise<void>;
}

export const AuthProvider: AuthProviderInterface = {
  isAuthenticated: false,
  email: null,
  password: null,
  async signin(email, password) {
    const user = await api.get("/users/1?_delay=2000");
    console.log(user.data);
    const token = "basdaskdljldqwelkzjxczx.addasdsxxc";
    AuthProvider.isAuthenticated = true;
    AuthProvider.email = email;
    jotaiSessionStore.setItem("isAuthenticated", true);
    jotaiSessionStore.setItem("email", email);
    jotaiSessionStore.setItem("token", token);
    jotaiSessionStore.setItem("user", user.data);
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    AuthProvider.isAuthenticated = false;
    AuthProvider.email = null;
    jotaiSessionStore.setItem("isAuthenticated", false);
    jotaiSessionStore.setItem("email", null);
  },
};
