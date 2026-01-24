
export enum ServiceType {
  ONE_TIME = 'ONE_TIME',
  YEARLY = 'YEARLY',
  EXPRESS = 'EXPRESS',
  FUEL = 'FUEL'
}

export interface CarModel {
  maxAge: number;
  maxKm: number;
  priceOneTime?: number;
  desc: string;
}

export interface BrandData {
  [modelName: string]: CarModel;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  isAdmin: boolean;
}

export interface Car {
  id: string;
  userUid: string;
  brand: string;
  model: string;
  year: number;
  lastOilKm: number;
  dailyKm: number;
  createdAt: string;
}

export interface Order {
  id: string;
  userName: string;
  brand: string;
  model: string;
  serviceType: string;
  phone: string;
  note?: string;
  timestamp: string;
}
