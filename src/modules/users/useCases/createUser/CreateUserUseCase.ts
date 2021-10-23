import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ name, cpf, phone }: ICreateUserDTO): Promise<ICreateUserDTO> {
    const user = await this.userRepository.create({
      name,
      cpf,
      phone,
    });

    return user;
  }
}

export { CreateUserUseCase };
