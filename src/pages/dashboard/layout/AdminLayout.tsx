
import { SideItem } from "../../../containers/dashboard/Sidebar";
import { DashboardWrapper } from "../../../containers/dashboard/DashboardWrapper";
import { LayoutOutlet } from "../../../containers/dashboard/LayoutWrapper";

export const AdminLayout = () => {
  return (
    <DashboardWrapper sidebar={sidebar}>
      <LayoutOutlet />
    </DashboardWrapper>
  );
};
export const sidebar: SideItem[] = [
  { name: "Dashboard", path: "/dashboard", iconName: "dashboard" },
  {
    name: "CUSTOMER MaNAGEMENT", children: [
      { name: "All Customer", path: "/all-customer", iconName: "people" },
      { name: "Merchant", path: "/merchant", iconName: "profile-2user" },
      { name: "Logistics", path: "/logistics", iconName: "truck-tick" },
    ]
  },
  {
    name: "STAFF MaNAGEMENT", children: [
      { name: "All Staff", path: "/all-staff", iconName: "profile-2user" },
      { name: "Roles & Permissions", path: "/roles-permissions", iconName: "tick-circle" },
    ]
  },
  {
    name: "Bills and Transaction", children: [
      { name: "Sales Report", path: "/sales-report", iconName: "report" },
      { name: "Bills and Transactions", path: "/bill-transactions", iconName: "note" },
      { name: "Escrow ", path: "/escrow ", iconName: "swap" },
    ]
  },
  {
    name: "Operation", children: [
      { name: "Help Desk", path: "/help-desk", iconName: "message-question" },
      { name: "Notifications", path: "/notifications", iconName: "notification" },
      { name: "Track Conversation", path: "/track-conversation", iconName: "people" },
      { name: "Order", path: "/order", iconName: "note" },
    ]
  },
];
