import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../pages/dashboard/layout/DashboardLayout";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";

export const AjosquadDashRouter: IModuleRouter = {
  key: "dashboard",
  guard: (loggedIn) => loggedIn,
  layout: DashboardLayout,
  routes: [
    {
      index: true,
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    LazyRoute(
      {
        path: "/dashboard",
      },
      () => import("../pages/dashboard/Dashboard")
    ),
    LazyRoute(
      {
        path: "/squad",
      },
      () => import("../pages/dashboard/Squad")
    ),
    LazyRoute(
      {
        path: "/squad/connect-gocardless"
      },
      () => import("../pages/dashboard/ConnectGoCardless")
    ),
    LazyRoute(
      {
        path: "/payment",
      },
      () => import("../pages/dashboard/Payment")
    ),
    LazyRoute(
      {
        path: "/payout",
      },
      () => import("../pages/dashboard/Payout")
    ),
    LazyRoute(
      {
        path: "/help",
      },
      () => import("../pages/dashboard/HelpDesk")
    ),
    LazyRoute(
      {
        path: "/referral",
      },
      () => import("../pages/dashboard/Referral/Referral")
    ),
    LazyRoute(
      {
        path: "/account",
      },
      () => import("../pages/dashboard/Account/Account")
    ),
    LazyRoute(
      {
        path: "/notification",
      },
      () => import("../pages/dashboard/Notifications")
    ),
    {
      path: "*",
      element: <Navigate to="/dashboard" />,
    },
  ],
};

export const AjosquadAdminDashRouter: IModuleRouter = {
  key: "admindashboard",
  guard: (loggedIn) => loggedIn,
  layout: DashboardLayout,  
  routes: [
    {
      index: true,
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    LazyRoute(
      {
        path: "/dashboard",
      },
      () => import("../pages/Admin/Dashboard")
    ),
    LazyRoute(
      {
        path: "/squad",
      },
      () => import("../pages/Admin/squad/Index")
    ),
    LazyRoute(
      {
        path: "/squad/squad-member",
      },
      () => import("../pages/Admin/squad/SquadMember")
    ),
    LazyRoute(
      {
        path: "/squad/squad-member/:id",
      },
      () => import("../pages/Admin/squad/SquadMemberDetails")
    ),
    LazyRoute(
      {
        path: "/squad/completed-squad",
      },
      () => import("../pages/Admin/squad/CompletedSquad")
    ),
    LazyRoute(
      {
        path: "/squad/completed-squad/:id",
      },
      () => import("../pages/Admin/squad/CompleteSquadDetails")
    ),
    LazyRoute(
      {
        path: "/squad/active-squad",
      },
      () => import("../pages/Admin/squad/ActiveSquad")
    ),
    LazyRoute(
      {
        path: "/squad/active-squad/:id",
      },
      () => import("../pages/Admin/squad/ActiveSquadDetails")
    ),
    LazyRoute(
      {
        path: "/squad/upcoming-squad",
      },
      () => import("../pages/Admin/squad/UpcomingSquad")
    ),
    LazyRoute(
      {
        path: "/squad/upcoming-squad/:id",
      },
      () => import("../pages/Admin/squad/UpcomingSquadDetails")
    ),
    LazyRoute(
      {
        path: "/user-management",
      },
      () => import("../pages/Admin/UserManagment")
    ),
    LazyRoute(
      {
        path: "/member-management",
      },
      () => import("../pages/Admin/member/Index")
    ),
    LazyRoute(
      {
        path: "/member-management/member-information/:id",
      },
      () => import("../pages/Admin/member/MemberDetails")
    ),
    LazyRoute(
      {
        path: "/member-management/inactive-member",
      },
      () => import("../pages/Admin/member/InactiveMember")
    ),
    LazyRoute(
      {
        path: "/member-management/ajosquad-member",
      },
      () => import("../pages/Admin/member/AjosquadMember")
    ),
    LazyRoute(
      {
        path: "/member-management/ajohome-member",
      },
      () => import("../pages/Admin/member/AjohomeMember")
    ),
    LazyRoute(
      {
        path: "/payment",
      },
      () => import("../pages/Admin/Payment")
    ),
    LazyRoute(
      {
        path: "/payout",
      },
      () => import("../pages/Admin/Payout")
    ),
    LazyRoute(
      {
        path: "/referral",
      },
      () => import("../pages/dashboard/Referral/Referral")
    ),
    LazyRoute(
      {
        path: "/kyc",
      },
      () => import("../pages/Admin/KycPage")
    ),
    LazyRoute(
      {
        path: "/guarantor-verification",
      },
      () => import("../pages/Admin/GuarantorVerification")
    ),
    LazyRoute(
      {
        path: "/account",
      },
      () => import("../pages/Admin/Account/Account")
    ),
    LazyRoute(
      {
        path: "/activity",
      },
      () => import("../pages/Admin/AccountActivity")
    ),
    LazyRoute(
      {
        path: "/notification",
      },
      () => import("../pages/dashboard/Notifications")
    ),
    {
      path: "*",
      element: <Navigate to="/dashboard" />,
    },
  ],
};
