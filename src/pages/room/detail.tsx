import { useNavigate, useParams } from 'react-router-dom';
import { StatusOptions } from '../../constant';
import Carousel from '../../components/carousel';
import { faker } from '@faker-js/faker';
import { useEffect, useRef, useState } from 'react';
import { RoomService } from '../../services/room/room.service';
import { CreateRoom, IRoom, IRoomType } from '../../interfaces/room';
import { RoomTypeService } from '../../services/room/roomType.service';

const RoomDetail = () => {
  const roomService = new RoomService();
  const roomTypeService = new RoomTypeService();
  const { id } = useParams();
  const [room, setRoom] = useState<IRoom | null>(null);
  const fakeImages = Array.from({ length: 5 }, () => faker.image.url());
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const getRoom = async (id: string) => {
    const room = await roomService.getRoomById(id);
    setRoom(room);
    setLoading(false);
  };

  const getRoomTypes = async () => {
    const roomTypes = await roomTypeService.getAllRoomTypes({});
    setRoomTypes(roomTypes);
  };

  useEffect(() => {
    getRoomTypes();
    if (id) {
      getRoom(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const formDataRef = useRef({
    name: '',
    roomTypeId: roomTypes[0]?.id || '',
    images: [] as File[],
    description: '',
    status: StatusOptions[0].value,
  });

  const handleSave = async () => {
    const data: CreateRoom = {
      name: formDataRef.current.name,
      roomTypeId: formDataRef.current.roomTypeId,
      images: [],
      description: formDataRef.current.description,
      status: formDataRef.current.status,
    };

    // TODO: upload images to cloud

    if (id) {
      await roomService.updateRoom(id, data);
    } else {
      await roomService.createRoom(data);
    }

    navigate('/room');
  };

  return (
    <div className="flex flex-wrap flex-col">
      {loading ? (
        <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg self-center">
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
        <>
          {room && (
            <Carousel
              images={fakeImages.map(image => ({
                src: image,
              }))}
            />
          )}
          <div className="page-header">
            <div className="flex flex-wrap items-center">
              <div className=" flex-grow max-w-full flex-1 px-4">
                <div className="mt-5">
                  <h4 className="page-title mb-3 float-left mt-2">{room ? 'Edit Room' : 'Add Room'}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-full pr-4 pl-4">
            <form>
              <div className="flex flex-wrap  formtype">
                <div className="md:w-1/3 pr-4 pl-4">
                  <div className="mb-4">
                    <label>Room Number</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="text"
                      defaultValue={room?.name || formDataRef.current.name}
                      onChange={e => {
                        formDataRef.current.name = e.target.value;
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-1/3 pr-4 pl-4">
                  <div className="mb-4">
                    <label>Room Type</label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      id="sel1"
                      name="sellist1"
                      defaultValue={room?.roomTypeId || formDataRef.current.roomTypeId}
                      onChange={e => {
                        formDataRef.current.roomTypeId = e.target.value;
                      }}
                    >
                      {roomTypes.map(roomType => (
                        <option key={roomType.id} value={roomType.id}>
                          {roomType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:w-1/3 pr-4 pl-4">
                  <div className="mb-4">
                    <label>Status</label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      id="sel2"
                      name="sellist1"
                      defaultValue={room?.status || formDataRef.current.status}
                      onChange={e => {
                        formDataRef.current.status = e.target.value;
                      }}
                    >
                      {StatusOptions.map(status => (
                        <option value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:w-1/3 pr-4 pl-4">
                  <div className="mb-4">
                    <label>Upload images</label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:ring-opacity-50 py-1 px-2"
                      id="multiple_files"
                      type="file"
                      multiple
                      onChange={e => {
                        formDataRef.current.images.push(...e.target.files!);
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-1/3 pr-4 pl-4">
                  <div className="mb-4">
                    <label>Description</label>
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      rows={5}
                      id="comment"
                      name="text"
                      defaultValue={room?.description || formDataRef.current.description}
                      onChange={e => {
                        formDataRef.current.description = e.target.value;
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none  buttonedit"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  buttonedit"
              onClick={() => {
                navigate('/room');
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomDetail;
