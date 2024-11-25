import { AxiosBasicCredentials } from "axios";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

type ROLE = "ADMIN" | "USER"

type PRODUCT = "AjoSquad" | "AjoHome" | "AjoBusiness"

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
        profile: null as | null | any,
        role: "ADMIN" as ROLE | null | string,
        verified: false,
        product: null as PRODUCT | null | string,
      },
      (set) => ({
        setLoggedIn: (value: boolean) => {
          set({ loggedIn: value });
        },
        setToken: (token: string | AxiosBasicCredentials | any) => {
          set({ token });
        },
        setVerified: (value: boolean) => {
          set({ verified: value });
        },
        setProduct: (value: any) => {
          set({ product: value });
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
            verified: false,
            product: ""
          });
          window.location.replace("/login")
        },
      })
    ),
    {
      name: "Ajosquad-auth",
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
  setProduct: (product: string) => {
    useAuth.setState({ product });
  },
  setVerified: (verified: boolean) => {
    useAuth.setState({ verified });
  },
};
