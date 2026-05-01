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
