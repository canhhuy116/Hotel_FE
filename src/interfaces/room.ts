import { Image } from './image';

export interface IRoom {
  id: number;
  name: string;
  price: number;
  imageUrls: string[];
}

export interface IRoomType {
  id: number;
  name: string;
  price: number;
  bedCount: number;
  chargesForCancellation: number;
  foodOption: string;
}

export interface CreateRoom {
  name: string;
  description: string;
  roomTypeId: number;
  images: Image[];
}

export interface CreateRoomType {
  name: string;
  price: number;
  bedCount: number;
  chargesForCancellation: number;
  foodOption: string;
}
