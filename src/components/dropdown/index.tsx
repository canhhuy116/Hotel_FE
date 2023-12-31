import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

interface DropdownProps {
  editLink?: string;
  deleteLink?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ editLink, deleteLink }: DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative dropdown dropdown-action" ref={dropdownRef}>
      <a
        href="#"
        className="action-icon inline-block w-0 h-0 ml-1 align border-b-0 border-t-1 border-r-1 border-l-1"
        onClick={toggleDropdown}
      >
        <i className="fa fa-ellipsis-v ellipse_color"></i>
      </a>
      {isDropdownOpen && (
        <div className="absolute flex right-10 z-50 float-left list-reset py-2 mt-1 text-base bg-white border border-gray-300 rounded dropdown-menu dropdown-menu-right">
          <NavLink
            className="block w-full py-1 px-3 font-normal text-gray-900 whitespace-no-wrap border-0"
            to={editLink || '#'}
          >
            <PencilSquareIcon className="h-5 w-5" />
          </NavLink>
          <NavLink
            className="block w-full py-1 px-3 font-normal text-gray-900 whitespace-no-wrap border-0"
            to={deleteLink || '#'}
          >
            <TrashIcon className="h-5 w-5" />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
