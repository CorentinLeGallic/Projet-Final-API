import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @Public()
  signUp(@Body() body: SignUpDto) {
    const { username, password } = body;

    return this.authService.signUp(username, password);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @Public()
  signIn(@Body() body: SignInDto) {
    const { username, password } = body;

    return this.authService.signIn(username, password);
  }
}
