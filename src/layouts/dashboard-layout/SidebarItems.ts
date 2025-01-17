import { Home2, Calendar, Ticket, Wallet, MessageCircle } from "iconsax-react";

export const sidebarMenuItems = [
  { name: "Home", path: "/app/home", icon: Home2 },
  { name: "Events", path: "/app/events?eventType=all", icon: Calendar },
  { name: "Tickets", path: "/app/tickets", icon: Ticket },
  { name: "Payments", path: "/app/payments", icon: Wallet },
  { name: "FAQs", path: "/app/faqs", icon: MessageCircle },
];
