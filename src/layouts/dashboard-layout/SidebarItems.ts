import { Home2, Calendar, Ticket, EmptyWalletAdd, Setting2 } from "iconsax-react";

export const sidebarMenuItems = [
  { name: "Home", path: "/app/home", icon: Home2 },
  { name: "Events", path: "/app/events?eventType=all", icon: Calendar },
  { name: "Tickets", path: "/app/tickets", icon: Ticket },
  { name: "Wallet", path: "/app/wallet", icon: EmptyWalletAdd },
  { name: "Settings", path: "/app/settings", icon: Setting2 },
];