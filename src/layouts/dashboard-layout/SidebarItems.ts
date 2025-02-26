import { Home2, Calendar, Ticket, EmptyWalletAdd } from "iconsax-react";

export const sidebarMenuItems = [
  { name: "Home", path: "/app/home", icon: Home2 },
  { name: "Events", path: "/app/events?eventType=all", icon: Calendar },
  { name: "Tickets", path: "/app/tickets", icon: Ticket },
  { name: "Wallet", path: "/app/wallet", icon: EmptyWalletAdd },
  // { name: "FAQs", path: "/app/faqs", icon: MessageCircle },
];
