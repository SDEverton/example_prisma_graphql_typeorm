import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { PrismaClient } from '@prisma/client';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create(data: ICreateUserDTO): Promise<ICreateUserDTO> {
    const person = await this.prisma.users.create({
      data,
    });

    return person;
  }
}

export { UsersRepository };
