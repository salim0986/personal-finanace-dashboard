import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entitiy';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async getOne(id: number): Promise<User> {
    const user = await this.repo.findOne({
      relations: ['transactions', 'journals', 'goals', 'assets'],
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<CreateUserDto> {
    if (!name || !email || !password) {
      throw new NotAcceptableException(
        'Name, email, and password are required',
      );
    }
    let user = this.repo.create({ name, email, password });
    user = await this.repo.save(user);
    return {
      message: 'User Registered Successfully',
      user,
    };
  }
  async login(email: string, password: string): Promise<CreateUserDto> {
    if (!email || !password) {
      throw new NotAcceptableException('Email and password are required');
    }
    const user = await this.repo.findOneBy({ email, password });
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    return {
      message: 'Login Successful',
      user,
    };
  }
}
