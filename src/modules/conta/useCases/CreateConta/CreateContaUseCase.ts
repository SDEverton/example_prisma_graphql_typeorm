import { inject, injectable } from 'tsyringe';

import { ICreateContasDTO } from '@modules/conta/dtos/ICreateContasDTO';
import { Contas } from '@modules/conta/infra/typeorm/entities/Contas';
import { IContasRepository } from '@modules/conta/repositories/IConstasRepository';

@injectable()
class CreateContaUseCase {
  constructor(
    @inject('ContasRepository')
    private contaRepository: IContasRepository
  ) {}
  async execute({
    flagAtivo,
    idPessoa,
    limiteSaqueDiario,
    saldo,
    tipoConta,
  }: ICreateContasDTO): Promise<Contas> {
    const conta = await this.contaRepository.create({
      dataCriacao: new Date(),
      flagAtivo,
      idPessoa,
      limiteSaqueDiario,
      saldo,
      tipoConta,
    });

    return conta;
  }
}

export { CreateContaUseCase };
