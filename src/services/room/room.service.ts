import { CreateRoom, IRoom } from '../../interfaces/room';
import http from '../http.service';

export class RoomService {
  public async getAllRooms({ page, limit, cursor }: { page?: number; limit?: number; cursor?: string }) {
    let url = '/rooms';
    if (page && limit) {
      url += `?page=${page}&limit=${limit}`;
    }
    if (cursor && limit) {
      url += `?cursor=${cursor}&limit=${limit}`;
    }

    const response = await http.get(url);
    const responseData = response.data;

    const result: IRoom[] = responseData.data.map((room: any) => {
      return {
        id: room.id,
        name: room.name,
        roomType: room.roomType.name,
        bedCount: room.roomType.bed_count,
        price: room.roomType.price,
        status: room.occupancy_status,
        imageUrls: room.images.map((image: any) => image.url),
        description: room.description,
      };
    });

    return {
      data: result,
      cursor: responseData.paging.nextCursor,
    };
  }

  public async getRoomById(id: string) {
    const response = await http.get(`/rooms/${id}`);
    const responseData = response.data;

    const result: IRoom = {
      id: responseData.data.id,
      name: responseData.data.name,
      roomType: responseData.data.roomType.name,
      bedCount: responseData.data.roomType.bed_count,
      price: responseData.data.roomType.price,
      status: responseData.data.occupancy_status,
      imageUrls: responseData.data.images.map((image: any) => image.url),
      description: responseData.data.description,
      roomTypeId: responseData.data.roomType.id,
    };

    return result;
  }

  public async createRoom(room: CreateRoom) {
    const mappedRoom = {
      name: room.name,
      description: room.description,
      room_type_id: room.roomTypeId,
      images: room.images,
      status: room.status,
    };

    await http.post('/rooms', mappedRoom);
  }

  public async updateRoom(id: string, room: CreateRoom) {
    const mappedRoom = {
      name: room.name,
      description: room.description,
      room_type_id: room.roomTypeId,
      images: room.images,
      status: room.status,
    };

    await http.put(`/rooms/${id}`, mappedRoom);
  }
}
