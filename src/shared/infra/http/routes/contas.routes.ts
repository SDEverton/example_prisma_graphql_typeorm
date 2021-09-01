import { Router } from 'express';

import { BalanceController } from '@modules/conta/useCases/Balance/BalanceController';
import { BlockContaController } from '@modules/conta/useCases/BlockConta/BlockContaController';
import { CreateContaController } from '@modules/conta/useCases/CreateConta/CreateContaController';
import { CreateDepositController } from '@modules/conta/useCases/CreateDeposit/CreateDepositController';
import { CreateWithdrawController } from '@modules/conta/useCases/CreateWithdraw/CreateWithdrawController';
import { ExtractController } from '@modules/conta/useCases/Extract/ExtractController';

const contasRouter = Router();

const createContaController = new CreateContaController();
const createDepositController = new CreateDepositController();
const balanceController = new BalanceController();
const createWithdrawController = new CreateWithdrawController();
const blockContaController = new BlockContaController();
const extractController = new ExtractController();

contasRouter.post('/', createContaController.handle);
contasRouter.post('/deposito', createDepositController.handle);
contasRouter.get('/saldo/:idConta', balanceController.handle);
contasRouter.post('/saque', createWithdrawController.handle);
contasRouter.put('/bloqueio/:idConta', blockContaController.handle);
contasRouter.post('/extrato', extractController.handle);

export { contasRouter };
