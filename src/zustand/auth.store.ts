import { AxiosBasicCredentials } from "axios";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

type ROLE = "AJOSQUAD_ADMIN"

interface Auth {
  username: string;
  password: string;
}

export const useAuth = create(
  persist(
    combine(
      {
        loggedIn: false,
        token: null as string | null | AxiosBasicCredentials,
        profile: null,
        role: null as ROLE | null | string,
      },
      (set) => ({
        setLoggedIn: (value: boolean) => {
          set({ loggedIn: value });
        },
        setToken: (token: string | AxiosBasicCredentials | any) => {
          set({ token });
        },
        setUserProfile: (profile: any) => {
          set({ profile, loggedIn: true });
        },
        setUserRoleType: (role: string) => {
          set({ role });
        },
        logout: () => {
          set({
            loggedIn: false,
            token: null,
            profile: null,
            role: null,
          });
          if(useAuth.getState().loggedIn) window.location.replace("/login")
        },
      })
    ),
    {
      name: "ecap-auth",
      getStorage: () => sessionStorage,
    }
  )
);

export const AuthActions = {
  logout: () => {
    useAuth.getState().logout();
  },
  setToken: (token: string | AxiosBasicCredentials) => {
    useAuth.getState().setToken(token);
  },
  setProfile: (profile: any) => {
    useAuth.getState().setUserProfile(profile);
  },
  setRole: (role: string) => {
    useAuth.setState({ role });
  },
};
