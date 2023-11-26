import { faker } from '@faker-js/faker';
import { NavLink } from 'react-router-dom';
import Dropdown from '../../components/dropdown';
import { useEffect, useState } from 'react';
import { IRoomType } from '../../interfaces/room';
import { RoomTypeService } from '../../services/room/roomType.service';
import { FoodOptions } from '../../constant';

export const generateFakeRoomType = (id: number) => ({
  id: id,
  name: faker.helpers.arrayElement(['Single', 'Double']),
  bedCount: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
  price: faker.helpers.rangeToNumber({ min: 100, max: 1000 }),
  chargesForCancellation: faker.helpers.rangeToNumber({ min: 0, max: 10 }),
  foodOption: faker.helpers.arrayElement(['Veg', 'Non-Veg']),
  status: faker.helpers.arrayElement(['Active', 'Inactive']),
});

const RoomType = () => {
  const roomTypeService = new RoomTypeService();
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllRoomTypes = async () => {
    const roomTypes = await roomTypeService.getAllRoomTypes({ limit: 2, page: 1 });
    setRoomTypes(roomTypes);
    setLoading(false);
  };

  useEffect(() => {
    getAllRoomTypes();
  }, []);

  return (
    <div className="flex flex-wrap flex-col">
      <div className="page-header">
        <div className="flex flex-wrap items-center">
          <div className=" flex-grow max-w-full flex-1 px-4">
            <div className="mt-5">
              <h4 className="mb-3 float-left mt-2">All Room Type</h4>
              <NavLink
                to="/room-type/add"
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 float-right veiwbutton"
              >
                Add Room Type
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:w-full pr-4 pl-4">
        <div className="flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card card-table">
          <div className="flex-auto p-6 card-body booking_card">
            {loading ? (
              <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50">
                <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">
                  loading...
                </div>
              </div>
            ) : (
              <div className="block w-full overflow-auto scrolling-touch">
                <table className="datatable w-full max-w-full mb-4 bg-transparent table-stripped w-full max-w-full mb-4 bg-transparent table-hover table-center mb-0 table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Bed Count</th>
                      <th>Price</th>
                      <th>Charges For Cancellation</th>
                      <th>Food Option</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomTypes.map(roomType => (
                      <tr key={roomType.id}>
                        <td>{roomType.name}</td>
                        <td>{roomType.bedCount}</td>
                        <td>{roomType.price}</td>
                        <td>
                          {roomType.chargesForCancellation === 0 ? 'Free' : `${roomType.chargesForCancellation}%`}
                        </td>
                        <td>{FoodOptions.find(foodOption => foodOption.value === roomType.foodOption)?.label}</td>
                        <td className="text-right">
                          <Dropdown editLink={`detail/${roomType.id}`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-end">
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </a>

              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomType;
