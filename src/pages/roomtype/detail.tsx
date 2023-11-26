import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BedCountOptions, ChargesForCancelOptions, FoodOptions } from '../../constant';
import { RoomTypeService } from '../../services/room/roomType.service';
import { CreateRoomType, IRoomType } from '../../interfaces/room';

const RoomTypeDetail = () => {
  const roomTypeService = new RoomTypeService();
  const { id } = useParams();
  const [roomType, setRoomType] = useState<IRoomType | null>(null);
  const navigate = useNavigate();
  const [priceError, setPriceError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getRoomType = async (id: string) => {
    const roomType = await roomTypeService.getRoomTypeById(id);
    setRoomType(roomType);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getRoomType(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const formDataRef = useRef({
    name: '',
    price: '',
    bedCount: BedCountOptions[0].value,
    foodOption: FoodOptions[0].value,
    chargesForCancellation: ChargesForCancelOptions[0].value,
  });

  const handleSave = async () => {
    const data: CreateRoomType = {
      name: formDataRef.current.name,
      price: Number(formDataRef.current.price),
      bedCount: formDataRef.current.bedCount,
      foodOption: formDataRef.current.foodOption,
      chargesForCancellation: formDataRef.current.chargesForCancellation,
    };

    if (id) {
      await roomTypeService.updateRoomType(id, data);
    } else {
      await roomTypeService.createRoomType(data);
    }

    navigate('/room-type');
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
                      const inputValue = e.target.value;

                      // Check if the input is a number
                      if (!isNaN(Number(inputValue))) {
                        setPriceError(null);
                        formDataRef.current.price = inputValue;
                      } else {
                        setPriceError('Please enter a valid number');
                      }
                    }}
                  />
                  {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}
                </div>
              </div>
              <div className="md:w-1/3 pr-4 pl-4">
                <div className="mb-4">
                  <label>Food</label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    defaultValue={roomType?.foodOption || formDataRef.current.foodOption}
                    onChange={e => {
                      formDataRef.current.foodOption = e.target.value;
                    }}
                  >
                    {FoodOptions.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
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
                    defaultValue={roomType?.bedCount || formDataRef.current.bedCount}
                    onChange={e => {
                      formDataRef.current.bedCount = Number(e.target.value);
                    }}
                  >
                    {BedCountOptions.map(bedCount => (
                      <option key={bedCount.value} value={bedCount.value}>
                        {bedCount.label}
                      </option>
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
                    defaultValue={roomType?.chargesForCancellation || ChargesForCancelOptions[0].value}
                    onChange={e => {
                      formDataRef.current.chargesForCancellation = Number(e.target.value);
                    }}
                  >
                    {ChargesForCancelOptions.map(charges => (
                      <option key={charges.value} value={charges.value}>
                        {charges.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
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
            navigate('/room-type');
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoomTypeDetail;
