import { Image } from './image';

export interface IRoom {
  id: string;
  name: string;
  roomType: string;
  bedCount: number;
  price: number;
  status: string;
  imageUrls: string[];
  description: string;
  roomTypeId?: string;
}

export interface IRoomType {
  id: string;
  name: string;
  price: number;
  bedCount: number;
  chargesForCancellation: number;
  foodOption: string;
}

export interface CreateRoom {
  name: string;
  description: string;
  roomTypeId: string;
  images: Image[];
  status: string;
}

export interface CreateRoomType {
  name: string;
  price: number;
  bedCount: number;
  chargesForCancellation: number;
  foodOption: string;
}
