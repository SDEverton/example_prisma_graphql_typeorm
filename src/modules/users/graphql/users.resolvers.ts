import { container } from 'tsyringe';

import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';
import { ListAllUsersUseCase } from '../useCases/listAllUsers/ListAllUsersUseCase';

const usersResolvers = {
  Query: {
    getAllUsers() {
      const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);
      const users = listAllUsersUseCase.execute();
      return users;
    },
  },
  Mutation: {
    createUser(_, { input }) {
      const createUserService = container.resolve(CreateUserUseCase);
      const user = createUserService.execute(input);
      return user;
    },
  },
};

export default usersResolvers;
