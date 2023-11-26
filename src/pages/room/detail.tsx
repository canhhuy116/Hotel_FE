import { useNavigate, useParams } from 'react-router-dom';
import { generateFakeRoom } from '.';
import { StatusOptions } from '../../constant';
import Carousel from '../../components/carousel';
import { faker } from '@faker-js/faker';
import { useRef } from 'react';

const RoomDetail = () => {
  const { id } = useParams();
  const room = id ? generateFakeRoom(parseInt(id)) : null;
  const fakeImages = Array.from({ length: 5 }, () => faker.image.url());
  const fakeRoomTypes = ['Single', 'Double', 'Quad', 'King', 'Suite', 'Villa'];
  const navigate = useNavigate();

  const formDataRef = useRef({
    roomNumber: 'BKG-0001',
    roomType: '',
    status: '',
    images: [] as File[],
    description: '',
  });

  const handleSave = () => {
    const formData = new FormData();

    const { images, ...rest } = formDataRef.current;

    const imageObj = images.map((image, index) => ({
      id: `image-${index}`,
      src: image.name,
    }));

    const data = {
      ...rest,
      images: imageObj,
    };

    formData.append('data', JSON.stringify(data));

    navigate('/room');
  };

  return (
    <div className="flex flex-wrap flex-col">
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
                  className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                  type="text"
                  defaultValue={room?.roomId || formDataRef.current.roomNumber}
                  onChange={e => {
                    formDataRef.current.roomNumber = e.target.value;
                  }}
                />
              </div>
            </div>
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Room Type</label>
                <select
                  className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                  id="sel1"
                  name="sellist1"
                  defaultValue={room?.roomType || formDataRef.current.roomType}
                  onChange={e => {
                    formDataRef.current.roomType = e.target.value;
                  }}
                >
                  <option>Select</option>
                  {fakeRoomTypes.map(roomType => (
                    <option key={roomType}>{roomType}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Status</label>
                <select
                  className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                  id="sel2"
                  name="sellist1"
                  defaultValue={room?.status || formDataRef.current.status}
                  onChange={e => {
                    formDataRef.current.status = e.target.value;
                  }}
                >
                  <option>Select</option>
                  {StatusOptions.map(status => (
                    <option key={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Food</label>
                <select
                  className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                  id="sel3"
                  name="sellist1"
                >
                  <option>Select</option>
                  <option>Free Breakfast</option>
                  <option>Free Lunch</option>
                  <option>Free Dinner</option>
                  <option>Free Breakfast &amp; Dinner</option>
                  <option>Free Welcome Drink</option>
                  <option>No Free Food</option>
                </select>
              </div>
            </div>
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Bed Count</label>
                <select
                  className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                  id="sel"
                  name="sellist1"
                >
                  <option>Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </div>
            </div>
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Charges For cancellation</label>
                <select
                  className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                  id="sel4"
                  name="sellist1"
                >
                  <option>Select</option>
                  <option>Free</option>
                  <option>5% Before 24Hours</option>
                  <option>No Cancellation Allow</option>
                </select>
              </div>
            </div> */}

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
                  className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
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
          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 buttonedit ml-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;
