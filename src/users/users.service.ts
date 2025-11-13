import { Injectable } from '@nestjs/common';
import { UserType } from 'types/users.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  users: UserType[];

  constructor() {
    this.users = [
      {
        uid: 'cff0ca43-0a8e-4da3-bbdf-7d6610f2509a',
        username: 'marcel',
        password:
          'ecbf3b3502941156.3d8b9e342eacaac494b2b118b90c23d3b85783f41a186246b019fb2a153df79a',
      },
    ];
  }

  getUserByUsername(username: string): UserType | null {
    return this.users.find((user) => user.username === username) ?? null;
  }

  getUserById(userId: string): UserType | null {
    return this.users.find((user) => user.uid === userId) ?? null;
  }

  createUser(username: string, password: string): UserType {
    const newId = uuidv4();

    const newUser = { uid: newId, username, password };

    this.users.push(newUser);

    return newUser;
  }
}
