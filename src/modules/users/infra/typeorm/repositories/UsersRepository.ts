import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { User } from '../entities/User';

class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, phone, cpf }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      phone,
      cpf,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
