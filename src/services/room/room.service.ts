import http from '../http.service';

export class RoomService {
  public async getAllRooms(page: number, limit: number, cursor: string) {
    const response = await http.get(`/rooms?page=${page}&limit=${limit}&cursor=${cursor}`);

    return response.data;
  }

  public async getRoomById(id: string) {
    const response = await http.get(`/rooms/${id}`);

    return response.data;
  }

  public async createRoom(room: any) {
    const response = await http.post('/rooms', room);

    return response.data;
  }
}
