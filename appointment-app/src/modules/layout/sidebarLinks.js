import DashboardIcon from "../../icons/js/dashboardIcon";
import ScheduleIcon from "../../icons/js/scheduleIcon";

const sidebarLinks = [
  {
    key: "1",
    name: "Dashboard",
    path: "/home",
    icon: DashboardIcon,
  },
  {
    key: "2",
    name: "Time Slots",
    path: "/home/time-slots",
    icon: DashboardIcon,
  },
  {
    key: "3",
    name: "Schedules",
    path: "/home/schedules",
    icon: ScheduleIcon,
  },
];

export default sidebarLinks;
