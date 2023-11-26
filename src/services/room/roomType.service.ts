import { CreateRoomType, IRoomType } from '../../interfaces/room';
import http from '../http.service';

export class RoomTypeService {
  public async getAllRoomTypes({ page, limit, cursor }: { page?: number; limit?: number; cursor?: string }) {
    let url = '/room-types';
    if (page && limit) {
      url += `?page=${page}&limit=${limit}`;
    } else if (cursor) {
      url += `?cursor=${cursor}`;
    }
    const response = await http.get(url);
    const responseData = response.data;

    if (!Array.isArray(responseData.data)) {
      throw new Error('Invalid response format: data is not an array');
    }

    const result: IRoomType[] = responseData.data.map((roomType: any) => {
      return {
        id: roomType.id,
        name: roomType.name,
        price: roomType.price,
        bedCount: roomType.bed_count,
        chargesForCancellation: roomType.charges_for_cancellation,
        foodOption: roomType.food_option,
      };
    });

    return result;
  }

  public async getRoomTypeById(id: string) {
    const response = await http.get(`/room-types/${id}`);
    const responseData = response.data;

    const result: IRoomType = {
      id: responseData.data.id,
      name: responseData.data.name,
      price: responseData.data.price,
      bedCount: responseData.data.bed_count,
      chargesForCancellation: responseData.data.charges_for_cancellation,
      foodOption: responseData.data.food_option,
    };

    return result;
  }

  public async createRoomType(roomType: CreateRoomType) {
    const mappedRoomType = {
      name: roomType.name,
      price: roomType.price,
      bed_count: roomType.bedCount,
      charges_for_cancellation: roomType.chargesForCancellation,
      food_option: roomType.foodOption,
    };

    await http.post('/room-types', mappedRoomType);
  }

  public async updateRoomType(id: string, roomType: CreateRoomType) {
    const mappedRoomType = {
      name: roomType.name,
      price: roomType.price,
      bed_count: roomType.bedCount,
      charges_for_cancellation: roomType.chargesForCancellation,
      food_option: roomType.foodOption,
    };

    await http.put(`/room-types/${id}`, mappedRoomType);
  }
}
