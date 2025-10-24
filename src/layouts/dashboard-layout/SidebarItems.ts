import {
  Home2,
  Calendar,
  Ticket,
  EmptyWalletAdd,
  Setting2,
  ChartSquare,
} from "iconsax-react";

export const sidebarMenuItems = [
  {
    name: "Home",
    path: "/app/home",
    icon: Home2,
    userRole: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Events",
    path: "/app/events?eventType=all",
    icon: Calendar,
    userRole: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Tickets",
    path: "/app/tickets",
    icon: Ticket,
    userRole: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Wallet",
    path: "/app/wallet",
    icon: EmptyWalletAdd,
    userRole: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Settings",
    path: "/app/settings",
    icon: Setting2,
    userRole: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Statistics",
    path: "/app/admin/statistics",
    icon: ChartSquare,
    userRole: ["SUPER_ADMIN"],
  },
];
