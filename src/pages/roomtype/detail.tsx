import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { generateFakeRoomType } from '.';
import { BedCountOptions, ChargesForCancelOptions, FoodOptions } from '../../constant';

const RoomTypeDetail = () => {
  const { id } = useParams();
  const roomType = id ? generateFakeRoomType(parseInt(id)) : null;
  const navigate = useNavigate();

  const formDataRef = useRef({
    name: '',
    price: '',
    bedCount: '',
    foodOption: '',
    chargesForCancellation: '',
  });

  const handleSave = () => {
    const formData = new FormData();

    formData.append('data', JSON.stringify(formDataRef.current));

    navigate('/room');
  };

  return (
    <div className="flex flex-wrap flex-col">
      <div className="page-header">
        <div className="flex flex-wrap items-center">
          <div className=" flex-grow max-w-full flex-1 px-4">
            <div className="mt-5">
              <h4 className="page-title mb-3 float-left mt-2">{roomType ? 'Edit Room Type' : 'Add Room Type'}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-full pr-4 pl-4">
        <form>
          <div className="flex flex-wrap  formtype">
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Name</label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  defaultValue={roomType?.name || formDataRef.current.name}
                  onChange={e => {
                    formDataRef.current.name = e.target.value;
                  }}
                />
              </div>
            </div>
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Price</label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  defaultValue={roomType?.price || formDataRef.current.price}
                  onChange={e => {
                    formDataRef.current.price = e.target.value;
                  }}
                />
              </div>
            </div>
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Food</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option selected>Select</option>
                  {FoodOptions.map(status => (
                    <option value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Bed Count</label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="sel"
                  name="sellist1"
                >
                  <option>Select</option>
                  {BedCountOptions.map(bedCount => (
                    <option value={bedCount.value}>{bedCount.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:w-1/3 pr-4 pl-4">
              <div className="mb-4">
                <label>Charges For cancellation</label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="sel4"
                  name="sellist1"
                >
                  <option>Select</option>
                  {ChargesForCancelOptions.map(charges => (
                    <option value={charges.value}>{charges.label}</option>
                  ))}
                </select>
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

export default RoomTypeDetail;
