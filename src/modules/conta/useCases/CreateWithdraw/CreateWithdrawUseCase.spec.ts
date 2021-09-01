import { ContasRepositoryInMemory } from '@modules/conta/repositories/in-memory/ContasRepositoryInMemory';
import { TransacoesRepositoryInMemory } from '@modules/transacoes/repositories/in-memory/TransacoesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateContaUseCase } from '../CreateConta/CreateContaUseCase';
import { CreateWithdrawUseCase } from './CreateWithdrawUseCase';

let createWithdrawUseCase: CreateWithdrawUseCase;
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

describe('Withdraw', () => {
  beforeEach(() => {
    contasRepositoryInMemory = new ContasRepositoryInMemory();
    transacoesRepositoryInMemory = new TransacoesRepositoryInMemory();
    createWithdrawUseCase = new CreateWithdrawUseCase(
      contasRepositoryInMemory,
      transacoesRepositoryInMemory
    );
    createContaUseCase = new CreateContaUseCase(contasRepositoryInMemory);
  });

  it('shold be able to create new Withdraw', async () => {
    await createContaUseCase.execute(data);

    const valor = 4;

    const deposit = await createWithdrawUseCase.execute(1, valor);

    expect(deposit.saldo).toBe(data.saldo - valor);
  });

  it('shold not be able to create new Withdraw did not find the account', async () => {
    const valor = 5;
    await expect(createWithdrawUseCase.execute(1, valor)).rejects.toEqual(
      new AppError('Não foi possível identificar a conta', 404)
    );
  });

  it('shold not be able to create new Withdraw smaller balance', async () => {
    await createContaUseCase.execute(data);

    const valor = 51;
    await expect(createWithdrawUseCase.execute(1, valor)).rejects.toEqual(
      new AppError(
        `Seu saldo (${data.saldo}) é menor que o valor que deseja sacar (${valor})`,
        403
      )
    );
  });

  it('shold not be able to create new Withdraw account block', async () => {
    data.flagAtivo = false;
    await createContaUseCase.execute(data);

    const valor = 5;
    await expect(createWithdrawUseCase.execute(1, valor)).rejects.toEqual(
      new AppError('Essa conta enconta-se bloqueada', 401)
    );
  });
});
