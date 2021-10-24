import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { PrismaClient } from '@prisma/client';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create(data: ICreateUserDTO): Promise<ICreateUserDTO> {
    const user = await this.prisma.users.create({
      data,
    });

    return user;
  }

  async findAll(): Promise<ICreateUserDTO[]> {
    return this.prisma.users.findMany();
  }
}

export { UsersRepository };
