import { Link, NavLink } from 'react-router-dom';
import { appRouters } from '../../routes/route.config';

export interface ISiderMenuProps {
  collapsed: boolean;
  onCollapse: any;
}

const SiderMenu = (props: ISiderMenuProps) => {
  const { collapsed } = props;

  return (
    <div
      className={`h-screen fixed bg-gray-900 ${collapsed ? 'w-16' : 'w-64'} transition-all ease-in-out duration-300`}
    >
      <div className="p-4">
        <div className={`${collapsed ? 'p-2' : 'p-8'} text-center`}>
          <Link to="/home">
            <span className="text-white text-2xl font-bold">Logo</span>
          </Link>
        </div>
        <ul className="mt-4">
          {appRouters
            .filter(item => item.showInMenu)
            .map(route => (
              <li key={route.path} className="mb-4">
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center ${collapsed ? 'pl-2' : 'pl-8'} ${
                      isActive ? 'text-sky-500' : 'text-gray-400 hover:text-sky-500'
                    }`
                  }
                >
                  <span className="mr-2 text-xl">{route.icon && <route.icon className="h-6 w-6" />}</span>
                  <span>{route.name}</span>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SiderMenu;
