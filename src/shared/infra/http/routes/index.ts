import { Router } from 'express';

import { contasRouter } from './contas.routes';
import { pessoasRouter } from './pessoas.routes';

const router = Router();

router.use('/pessoas', pessoasRouter);
router.use('/contas', contasRouter);

export { router };
