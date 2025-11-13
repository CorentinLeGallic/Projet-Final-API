import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

const getHashedPassword = async (password: string, salt: string) => {
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  return hash.toString('hex');
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async getAuthToken(
    userId: string,
    username: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      username: username,
    };

    return await this.jwtService.signAsync(payload);
  }

  async signUp(username: string, password: string) {
    const existingUser = this.usersService.getUserByUsername(username);

    if (existingUser) throw new ConflictException();

    const salt = randomBytes(8).toString('hex');

    const hashedPassword = await getHashedPassword(password, salt);

    const newUser = this.usersService.createUser(
      username,
      `${salt}.${hashedPassword}`,
    );

    return {
      accessToken: await this.getAuthToken(newUser.uid, newUser.username),
    };
  }

  async signIn(username: string, password: string) {
    const user = this.usersService.getUserByUsername(username);

    if (!user) throw new UnauthorizedException();

    const [salt, hashedPassword] = user.password.split('.');

    const _hashedPassword = await getHashedPassword(password, salt);

    if (hashedPassword !== _hashedPassword) throw new UnauthorizedException();

    return {
      accessToken: await this.getAuthToken(user.uid, user.username),
    };
  }
}
