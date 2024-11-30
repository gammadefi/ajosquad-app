import { SideItem } from "../../../containers/dashboard/Sidebar";
import { DashboardWrapper } from "../../../containers/dashboard/DashboardWrapper";
import { LayoutOutlet } from "../../../containers/dashboard/LayoutWrapper";
import { useAuth } from "../../../zustand/auth.store";

type Route = { name: string; path: string; iconName: string };

export const sidebar: Record<string, Route[]> = {
  ADMIN: [
    { name: "Dashboard", path: "/dashboard", iconName: "element-4" },
    { name: "Squad", path: "/squad", iconName: "people" },
    { name: "Pods", path: "/pod", iconName: "buildings" },
    { name: "Payment", path: "/payment", iconName: "money-receive" },
    { name: "Payout", path: "/payout", iconName: "money-send" },
  ],
  USER: [
    { name: "Dashboard", path: "/dashboard", iconName: "element-4" },
    { name: "Squad", path: "/squad", iconName: "people" },
    { name: "Payment", path: "/payment", iconName: "money-receive" },
    { name: "Payout", path: "/payout", iconName: "money-send" },
  ],
};

export const sidebarMid: Record<string, Route[]> = {
  ADMIN: [
    { name: "Member Mangament", path: "/member-management", iconName: "people" },
    { name: "User Mangament", path: "/user-management", iconName: "profile-2user" },
    { name: "KYC", path: "/kyc", iconName: "profile-tick" },
    { name: "Account Activity", path: "/activity", iconName: "activity" },
    { name: "Guarantor verification", path: "/guarantor-verification", iconName: "profile-tick" },
    { name: "Account", path: "/account", iconName: "profile-circle" },
    { name: "Referral", path: "/referral", iconName: "profile-2user" },
  ],
  USER: [
    { name: "Account", path: "/account", iconName: "profile-circle" },
    { name: "Referral", path: "/referral", iconName: "profile-2user" },
  ],
};

export const sidebarEnd: Record<string, Route[]> = {
  ADMIN: [
    // { name: "Help Desk", path: "/help", iconName: "help" },
    { name: "Notification", path: "/notification", iconName: "notification-bing" },
  ],
  USER: [
    { name: "Help Desk", path: "/help", iconName: "help2" },
    { name: "Notification", path: "/notification", iconName: "notification-bing" },
  ],
};

export const DashboardLayout = () => {
  const role = useAuth((s) => s.role) as keyof typeof sidebar;

  console.log(role)

  const routes = sidebar[role]?.concat(sidebarMid[role], sidebarEnd[role]) || [];

  return (
    <DashboardWrapper sidebar={routes}>
      <LayoutOutlet />
    </DashboardWrapper>
  );
};
