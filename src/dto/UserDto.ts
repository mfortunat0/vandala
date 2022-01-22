export interface UserDto {
  id?: string;
  name: string;
  email: string;
  password?: string;
  balance?: number;
  admin?: boolean;
}
