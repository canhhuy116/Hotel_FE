import { RouteObject } from 'react-router-dom';
import AppLayout from '../pages/layout';
import { appRouters, IRoute } from './route.config';

export default [
  {
    path: '/',
    element: <AppLayout />,
    children: appRouters.map((route: IRoute) => {
      return {
        path: route.path,
        element: <route.component />,
      };
    }),
  },
] as RouteObject[];
