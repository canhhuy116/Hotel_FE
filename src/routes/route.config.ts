import About from '../pages/about';
import Home from '../pages/home';
import Room from '../pages/room';
import { BookmarkIcon, HomeIcon, InboxIcon, KeyIcon } from '@heroicons/react/24/solid';
import RoomDetail from '../pages/room/detail';
import React from 'react';
import RoomType from '../pages/roomtype';
import RoomTypeDetail from '../pages/roomtype/detail';

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
  {
    path: '/room-type',
    title: 'room-type',
    name: 'Loại phòng',
    icon: InboxIcon,
    showInMenu: true,
    component: RoomType,
  },
  {
    path: '/room-type/detail/:id',
    title: 'room-type',
    name: 'Loại phòng',
    icon: InboxIcon,
    showInMenu: false,
    component: RoomTypeDetail,
  },
  {
    path: '/room-type/add',
    title: 'room-type',
    name: 'Loại phòng',
    icon: InboxIcon,
    showInMenu: false,
    component: RoomTypeDetail,
  },
];

export const routers = [...appRouters];
