export class UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export class CreateUserDto {
  access_token: string;
}
