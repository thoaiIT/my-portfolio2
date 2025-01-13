import { paths } from '@/routes/paths';
import {
  BookOpen,
  Bot,
  ChartArea,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

export const MenuItems = [
  {
    title: 'Dashboard',
    url: paths.admin.dashboard,
    icon: ChartArea,
  },
  {
    title: 'Skills',
    url: paths.admin.skills,
    icon: SquareTerminal,
  },
  {
    title: 'Social',
    url: paths.admin.socials,
    icon: Bot,
  },
  {
    title: 'Projects',
    url: paths.admin.projects,
    icon: BookOpen,
  },
  {
    title: 'About',
    url: paths.admin.about,
    icon: Settings2,
  },
];
