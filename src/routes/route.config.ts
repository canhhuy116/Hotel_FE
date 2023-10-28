import About from '../pages/about';
import Home from '../pages/home';
import { HomeIcon, BookmarkIcon } from '@heroicons/react/24/solid';

export interface IRoute {
  path: string;
  title: string;
  name: string;
  icon: any;
  showInMenu: boolean;
  component: () => JSX.Element;
}

export const appRouters: IRoute[] = [
  {
    path: '/home',
    title: 'home',
    name: 'Trang chủ',
    icon: HomeIcon,
    showInMenu: true,
    component: Home,
  },

  {
    path: '/about',
    title: 'about',
    name: 'Giới thiệu',
    icon: BookmarkIcon,
    showInMenu: true,
    component: About,
  },
];

export const routers = [...appRouters];
