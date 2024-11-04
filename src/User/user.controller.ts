import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: { googleId: string; email: string; name: string }) {
    return this.userService.createUser(body.googleId, body.email, body.name);
  }
}
