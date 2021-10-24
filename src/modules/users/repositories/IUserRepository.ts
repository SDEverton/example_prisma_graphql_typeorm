import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<ICreateUserDTO>;
  findAll(): Promise<ICreateUserDTO[]>;
}

export { IUserRepository };
