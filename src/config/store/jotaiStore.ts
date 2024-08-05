import { createStore } from "jotai";
import { createJSONStorage } from "jotai/utils";

export const regularStore = createStore();

export const jotaiSessionStore = createJSONStorage(() => sessionStorage);
