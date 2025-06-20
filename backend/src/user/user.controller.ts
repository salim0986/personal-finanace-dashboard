import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { Public } from './auth-decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(
    @Param('id') id: number,
  ): Promise<{ name: string; email: string; password: string }> {
    return this.userService.getOne(id);
  }
  @Public()
  @Post('register')
  createUser(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<CreateUserDto> {
    return this.userService.register(body.name, body.email, body.password);
  }
  @Public()
  @Post('login')
  loginUser(
    @Body() body: { email: string; password: string },
  ): Promise<CreateUserDto> {
    return this.userService.login(body.email, body.password);
  }
}
