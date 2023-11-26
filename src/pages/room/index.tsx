import { faker } from '@faker-js/faker';
import '../../assets/css/style.css';
import Dropdown from '../../components/dropdown';
import { NavLink } from 'react-router-dom';

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
  // Generate fake room data for demonstration
  const fakeRooms = Array.from({ length: 5 }, (_, index) => generateFakeRoom(index + 1));

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
                  {fakeRooms.map(room => (
                    <tr key={room.roomId}>
                      <td>{room.roomId}</td>
                      <td>
                        <h2 className="table-avatar">
                          <a href="profile.html" className="avatar avatar-sm mr-2">
                            <img className="avatar-img rounded-full" src={faker.image.avatar()} alt="User Image" />
                          </a>
                          <a href="profile.html">
                            {room.name}
                            <span>{`#${room.roomId.slice(5)}`}</span>
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
                              room.status === 'Active' ? 'bg-success-light' : 'bg-danger-light'
                            } mr-2`}
                          >
                            {room.status}
                          </a>{' '}
                        </div>
                      </td>
                      <td className="text-right">
                        <Dropdown editLink={`detail/${room.roomId.slice(5)}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
