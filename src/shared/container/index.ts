import { container } from 'tsyringe';

import { UsersRepository } from '@modules/users/infra/prisma/repostitories/UsersRepository';
// import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);
