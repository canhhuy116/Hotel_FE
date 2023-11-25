import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidesMenu from '../../components/sider';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`${collapsed ? 'w-16' : 'w-64'} bg-gray-900 text-white transition-all duration-300 ease-in-out`}>
        <SidesMenu collapsed={collapsed} onCollapse={onCollapse} />
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white h-16 p-4 shadow-md">{/* Replace Header content */}</div>
        {/* Main Content */}
        <div className="flex-1 p-4" style={{ backgroundColor: '#f2f5fa' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
