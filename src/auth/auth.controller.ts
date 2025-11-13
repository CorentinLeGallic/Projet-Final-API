import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() body: SignUpDto) {
    const { username, password } = body;

    return this.authService.signUp(username, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body: SignInDto) {
    const { username, password } = body;

    return this.authService.signIn(username, password);
  }
}
