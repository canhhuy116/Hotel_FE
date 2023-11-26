import About from '../pages/about';
import Home from '../pages/home';
import Room from '../pages/room';
import { BookmarkIcon, HomeIcon, KeyIcon } from '@heroicons/react/24/solid';
import RoomDetail from '../pages/room/detail';
import React from 'react';

export interface IRoute {
  path: string;
  title: string;
  name: string;
  icon: any;
  showInMenu: boolean;
  component: React.FC<any>;
}

export const appRouters: IRoute[] = [
  {
    path: '/',
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
  {
    path: '/room',
    title: 'room',
    name: 'Phòng',
    icon: KeyIcon,
    showInMenu: true,
    component: Room,
  },
  {
    path: '/room/detail/:id',
    title: 'room',
    name: 'Phòng',
    icon: KeyIcon,
    showInMenu: false,
    component: RoomDetail,
  },
  {
    path: '/room/add',
    title: 'room',
    name: 'Phòng',
    icon: KeyIcon,
    showInMenu: false,
    component: RoomDetail,
  },
];

export const routers = [...appRouters];
