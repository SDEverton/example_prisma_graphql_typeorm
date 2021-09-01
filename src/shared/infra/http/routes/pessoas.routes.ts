import { Router } from 'express';

import { CreatePessoaController } from '@modules/pessoas/useCases/createPessoa/CreatePessoaController';

const pessoasRouter = Router();

const createPessoaController = new CreatePessoaController();

pessoasRouter.post('/', createPessoaController.handle);

export { pessoasRouter };
