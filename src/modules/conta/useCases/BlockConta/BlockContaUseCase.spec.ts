import { ContasRepositoryInMemory } from '@modules/conta/repositories/in-memory/ContasRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateContaUseCase } from '../CreateConta/CreateContaUseCase';
import { BlockContaUseCase } from './BlockContaUseCase';

let blockContaUseCase: BlockContaUseCase;
let createContaUseCase: CreateContaUseCase;
let contasRepositoryInMemory: ContasRepositoryInMemory;

describe('Block Conta', () => {
  beforeEach(() => {
    contasRepositoryInMemory = new ContasRepositoryInMemory();
    blockContaUseCase = new BlockContaUseCase(contasRepositoryInMemory);
    createContaUseCase = new CreateContaUseCase(contasRepositoryInMemory);
  });

  it('shold be able to block conta', async () => {
    await createContaUseCase.execute({
      flagAtivo: true,
      idPessoa: 1,
      limiteSaqueDiario: 5,
      saldo: 50,
      tipoConta: 1,
      dataCriacao: new Date(),
      idConta: 1,
    });

    const status = false;

    const balance = await blockContaUseCase.execute(1, status);

    expect(balance.flagAtivo).toBe(false);
  });

  it('shold not be able to block conta', async () => {
    const status = false;
    await expect(blockContaUseCase.execute(1, status)).rejects.toEqual(
      new AppError('Não foi possível identificar a conta', 404)
    );
  });
});
