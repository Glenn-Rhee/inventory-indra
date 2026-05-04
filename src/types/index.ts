export interface ResponsePayload<T = unknown> {
  status: "success" | "failed";
  message: string;
  data: T;
}

export interface DataUserResponse {
  Id: string;
  Username: string;
  ImageUrl: string;
}

export interface DataUser {
  id: string;
  username: string;
  imageUrl: string;
}

export interface DataProductResponse {
  Id: string;
  Name: string;
  Category: "MEDICINE" | "ESSENTIALS";
  Price: number;
  StatusExpired: "SAFE" | "WARNING" | "EXPIRED";
  ExpiredDate: Date;
}
