import { faker } from '@faker-js/faker';
import '../../assets/css/style.css';
import Dropdown from '../../components/dropdown';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IRoom } from '../../interfaces/room';
import { RoomService } from '../../services/room/room.service';
import { StatusOptions } from '../../constant';

export const generateFakeRoom = (id: number) => ({
  roomId: `ROOM-${id}`,
  name: faker.person.fullName(),
  roomType: faker.helpers.arrayElement(['Single', 'Double']),
  bedCount: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
  price: faker.helpers.rangeToNumber({ min: 100, max: 1000 }),
  status: faker.helpers.arrayElement(['Active', 'Inactive']),
  description: faker.lorem.paragraph(),
});

const Room = () => {
  const roomService = new RoomService();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllRooms = async () => {
    const rooms = await roomService.getAllRooms({ limit: 5, page: 1 });
    setRooms(rooms.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <div className="flex flex-wrap flex-col">
      <div className="page-header">
        <div className="flex flex-wrap items-center">
          <div className=" flex-grow max-w-full flex-1 px-4">
            <div className="mt-5">
              <h4 className="mb-3 float-left mt-2">All Rooms</h4>
              <NavLink
                to="/room/add"
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 float-right veiwbutton"
              >
                Add Room
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:w-full pr-4 pl-4">
        <div className="flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card card-table">
          <div className="flex-auto p-6 card-body booking_card">
            {loading ? (
              <div className="flex items-center justify-center w-56 h-56 rounded-lg mx-auto">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="block w-full overflow-auto scrolling-touch">
                <table className="datatable w-full max-w-full mb-4 bg-transparent table-stripped w-full max-w-full mb-4 bg-transparent table-hover table-center mb-0 table">
                  <thead>
                    <tr>
                      <th>Room ID</th>
                      <th>Name</th>
                      <th>Room Type</th>
                      <th>Bed Count</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, index) => (
                      <tr key={room.id}>
                        <td>{`ROOM-${index}`}</td>
                        <td>
                          <h2 className="table-avatar">
                            <a href="profile.html" className="avatar avatar-sm mr-2">
                              <img className="avatar-img rounded-full" src={faker.image.avatar()} alt="User Image" />
                            </a>
                            <a href="profile.html">
                              {room.name}
                              <span>{`#${room.id}`}</span>
                            </a>
                          </h2>
                        </td>
                        <td>{room.roomType}</td>
                        <td>{room.bedCount}</td>
                        <td>{room.price}</td>
                        <td>
                          <div className="actions">
                            {' '}
                            <a
                              href="#"
                              className={`inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline py-1 px-2 leading-tight text-xs  ${
                                room.status === StatusOptions[0].value ? 'bg-success-light' : 'bg-danger-light'
                              } mr-2`}
                            >
                              {StatusOptions.find(statusOption => statusOption.value === room.status)?.label}
                            </a>{' '}
                          </div>
                        </td>
                        <td className="text-right">
                          <Dropdown editLink={`detail/${room.id}`} />
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

export default Room;
