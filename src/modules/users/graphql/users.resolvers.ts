import { container } from 'tsyringe';

import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';

const usersResolvers = {
  // Query: {
  //   getAllUsers() {
  //     return 'users';
  //   },
  // },
  Mutation: {
    createUser(_, { input }) {
      const createUserService = container.resolve(CreateUserUseCase);
      const user = createUserService.execute(input);
      return user;
    },
  },
};

export default usersResolvers;
