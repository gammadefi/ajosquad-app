
import { SideItem } from "../../../containers/dashboard/Sidebar";
import { DashboardWrapper } from "../../../containers/dashboard/DashboardWrapper";
import { LayoutOutlet } from "../../../containers/dashboard/LayoutWrapper";

export const AdminLayout = () => {
  const routes = sidebar.concat(sidebarMid, sidebarEnd)
  return (
    <DashboardWrapper sidebar={routes}>
      <LayoutOutlet />
    </DashboardWrapper>
  );
};
export const sidebar: SideItem[] = [
  { name: "Dashboard", path: "/dashboard", iconName: "element-4" },
  { name: "Squad", path: "/squad", iconName: "people" },
  { name: "Payment Authorization", path: "/payment-authorization", iconName: "money-tick" },
  { name: "Payment", path: "/payment", iconName: "money-receive" },
  { name: "Payout", path: "/payout", iconName: "money-send" },
];

export const sidebarMid: SideItem[] = [
  { name: "Account", path: "/account", iconName: "profile-circle" },
  { name: "Referral", path: "/referral", iconName: "profile-2user" }
];

export const sidebarEnd: SideItem[] = [
  { name: "Notification", path: "/notification", iconName: "notification-bing" },
  { name: "Join Ajohomes", path: "/#", iconName: "logo" },


];
