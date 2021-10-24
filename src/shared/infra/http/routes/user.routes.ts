import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListAllUsersController } from '@modules/users/useCases/listAllUsers/ListAllUsersController';

const userRouter = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();

userRouter.post('/', createUserController.handle);
userRouter.get('/list', listAllUsersController.handle);

export { userRouter };
