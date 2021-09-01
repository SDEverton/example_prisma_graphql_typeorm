import { ContasRepositoryInMemory } from '@modules/conta/repositories/in-memory/ContasRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateContaUseCase } from '../CreateConta/CreateContaUseCase';
import { BalanceUseCase } from './BalanceUseCase';

let balanceUseCase: BalanceUseCase;
let createContaUseCase: CreateContaUseCase;
let contasRepositoryInMemory: ContasRepositoryInMemory;

describe('Balance', () => {
  beforeEach(() => {
    contasRepositoryInMemory = new ContasRepositoryInMemory();
    balanceUseCase = new BalanceUseCase(contasRepositoryInMemory);
    createContaUseCase = new CreateContaUseCase(contasRepositoryInMemory);
  });

  it('shold be able to balance', async () => {
    await createContaUseCase.execute({
      flagAtivo: true,
      idPessoa: 1,
      limiteSaqueDiario: 5,
      saldo: 50,
      tipoConta: 1,
      dataCriacao: new Date(),
      idConta: 1,
    });

    const balance = await balanceUseCase.execute(1);

    expect(balance).toHaveProperty('saldo');
  });

  it('shold not be able to balance', async () => {
    await expect(balanceUseCase.execute(1)).rejects.toEqual(
      new AppError('Não foi possível identificar a conta', 404)
    );
  });
});
