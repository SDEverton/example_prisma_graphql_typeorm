import { ContasRepositoryInMemory } from '@modules/conta/repositories/in-memory/ContasRepositoryInMemory';
import { TransacoesRepositoryInMemory } from '@modules/transacoes/repositories/in-memory/TransacoesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateContaUseCase } from '../CreateConta/CreateContaUseCase';
import { CreateDepositUseCase } from './CreateDepositUseCase';

let createDepositUseCase: CreateDepositUseCase;
let createContaUseCase: CreateContaUseCase;
let contasRepositoryInMemory: ContasRepositoryInMemory;
let transacoesRepositoryInMemory: TransacoesRepositoryInMemory;

const data = {
  flagAtivo: true,
  idPessoa: 1,
  limiteSaqueDiario: 5,
  saldo: 50,
  tipoConta: 1,
  dataCriacao: new Date(),
  idConta: 1,
};

describe('Deposit', () => {
  beforeEach(() => {
    contasRepositoryInMemory = new ContasRepositoryInMemory();
    transacoesRepositoryInMemory = new TransacoesRepositoryInMemory();
    createDepositUseCase = new CreateDepositUseCase(
      contasRepositoryInMemory,
      transacoesRepositoryInMemory
    );
    createContaUseCase = new CreateContaUseCase(contasRepositoryInMemory);
  });

  it('shold be able to create new deposit', async () => {
    await createContaUseCase.execute(data);

    const valor = 5;

    const deposit = await createDepositUseCase.execute(1, valor);

    expect(deposit.saldo).toBe(valor + data.saldo);
  });

  it('shold not be able to create new deposit did not find the account', async () => {
    const valor = 5;
    await expect(createDepositUseCase.execute(1, valor)).rejects.toEqual(
      new AppError('Não foi possível identificar a conta', 404)
    );
  });

  it('shold not be able to create new deposit account block', async () => {
    data.flagAtivo = false;
    await createContaUseCase.execute(data);

    const valor = 5;
    await expect(createDepositUseCase.execute(1, valor)).rejects.toEqual(
      new AppError('Essa conta enconta-se bloqueada', 401)
    );
  });
});
