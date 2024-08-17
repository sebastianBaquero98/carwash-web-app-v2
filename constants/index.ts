import { SidebarLink } from "@/types";

export const sidebarLinks: SidebarLink[] = [
  {
    route: "/orders",
    label: "ORDERS",
    authorized: ["MANAGER", "TÉCNICO", "LIDER"],
  },
  {
    route: "/",
    label: "SERVICES",
    authorized: ["ADMIN"],
  },
  {
    route: "/",
    label: "SERVICES",
    authorized: ["MANAGER", "TÉCNICO", "LIDER"],
  },
  {
    route: "/",
    label: "CLIENTS",
    authorized: ["MANAGER", "LIDER", "ADMIN"],
  },
  {
    route: "/",
    label: "LOCATIONS",
    authorized: ["ADMIN", "CONTABILIDAD"],
  },
  {
    route: "/",
    label: "DASHBOARD",
    authorized: ["MANAGER", "LIDER", "ADMIN", "CONTABILIDAD"],
  },
  {
    route: "/",
    label: "DASHBOARD BAYS",
    authorized: ["MANAGER", "ADMIN", "CONTABILIDAD", "LIDER"],
  },
  {
    route: "/location-selector",
    label: "LOCATION SELECTOR",
    authorized: ["MANAGER", "TÉCNICO", "LIDER"],
  },
];
