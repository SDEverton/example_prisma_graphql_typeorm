import { ContasRepositoryInMemory } from '@modules/conta/repositories/in-memory/ContasRepositoryInMemory';

import { CreateContaUseCase } from './CreateContaUseCase';

let createContaUseCase: CreateContaUseCase;
let contasRepositoryInMemory: ContasRepositoryInMemory;

describe('Create Conta', () => {
  beforeEach(() => {
    contasRepositoryInMemory = new ContasRepositoryInMemory();
    createContaUseCase = new CreateContaUseCase(contasRepositoryInMemory);
  });

  it('shold be able to create a new Conta', async () => {
    const conta = await createContaUseCase.execute({
      flagAtivo: true,
      idPessoa: 1,
      limiteSaqueDiario: 5,
      saldo: 50,
      tipoConta: 1,
      dataCriacao: new Date(),
      idConta: 1,
    });

    expect(conta).toHaveProperty('flagAtivo');
  });
});
