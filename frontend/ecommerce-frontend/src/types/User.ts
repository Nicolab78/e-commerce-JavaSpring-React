export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
  phoneNumber?: string;
}

export interface UpdateUserDto {
  username: string;
  email: string;
  password?: string;
  phoneNumber?: string;
}