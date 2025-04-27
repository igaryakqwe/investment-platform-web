import { BoxIcon, BadgeCheckIcon } from "lucide-react";
import ProjectsTab from "@/features/profile/components/projects-tab";
import InvestmentsTab from "@/features/profile/components/investments-tab";

export const TABS = [
  {
    label: "Projects",
    value: "tab-1",
    icon: BoxIcon,
    content: ProjectsTab,
  },
  {
    label: "Investments",
    value: "tab-2",
    icon: BadgeCheckIcon,
    content: InvestmentsTab,
  },
];
