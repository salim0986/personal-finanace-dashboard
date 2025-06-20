import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entitiy';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { tryCatch } from 'src/utils/try-catch';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getOne(id: number): Promise<User> {
    return tryCatch(async () => {
      const user = await this.repo.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }, 'Error fetching user by ID');
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<CreateUserDto> {
    return tryCatch(async () => {
      if (!name || !email || !password) {
        throw new NotAcceptableException(
          'Name, email, and password are required',
        );
      }
      const saltOrRounds = 10;

      const hash = await bcrypt.hash(password, saltOrRounds);
      let user = this.repo.create({ name, email, password: hash });
      user = await this.repo.save(user);
      const payload = { sub: user.email, username: user.name, id: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }, 'Error registering user');
  }
  async login(email: string, password: string): Promise<CreateUserDto> {
    return tryCatch(async () => {
      if (!email || !password) {
        throw new NotAcceptableException('Email and password are required');
      }
      const user = await this.repo.findOneBy({ email });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!user || !isMatch) {
        throw new NotFoundException('Invalid email or password');
      }
      const payload = { sub: user.email, username: user.name, id: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }, 'Error logging in user');
  }
}
