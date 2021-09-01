import { ContasRepositoryInMemory } from '@modules/conta/repositories/in-memory/ContasRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateContaUseCase } from '../CreateConta/CreateContaUseCase';
import { ExtractUseCase } from './ExtractUseCase';

let extractUseCase: ExtractUseCase;
let createContaUseCase: CreateContaUseCase;
let contasRepositoryInMemory: ContasRepositoryInMemory;

const data = {
  flagAtivo: true,
  idPessoa: 1,
  limiteSaqueDiario: 5,
  saldo: 50,
  tipoConta: 1,
  dataCriacao: new Date(),
  idConta: 1,
};

describe('Extract', () => {
  beforeEach(() => {
    contasRepositoryInMemory = new ContasRepositoryInMemory();
    extractUseCase = new ExtractUseCase(contasRepositoryInMemory);
    createContaUseCase = new CreateContaUseCase(contasRepositoryInMemory);
  });

  it('shold be able to Extract', async () => {
    await createContaUseCase.execute(data);

    const extract = await extractUseCase.execute(1, '', '');

    expect(extract).toHaveProperty('idConta');
  });

  it('shold not be able to account not exist', async () => {
    await expect(extractUseCase.execute(1, '', '')).rejects.toEqual(
      new AppError('Não foi possível identificar a conta', 404)
    );
  });

  it('shold not be able to block conta', async () => {
    data.flagAtivo = false;
    await createContaUseCase.execute(data);

    await expect(extractUseCase.execute(1, '', '')).rejects.toEqual(
      new AppError('Essa conta enconta-se bloqueada', 401)
    );
  });
});
