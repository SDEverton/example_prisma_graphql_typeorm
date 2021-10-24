import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(): Promise<ICreateUserDTO[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}

export { ListAllUsersUseCase };
