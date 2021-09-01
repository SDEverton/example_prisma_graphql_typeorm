import { inject, injectable } from 'tsyringe';

import { Contas } from '@modules/conta/infra/typeorm/entities/Contas';
import { IContasRepository } from '@modules/conta/repositories/IConstasRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class BlockContaUseCase {
  constructor(
    @inject('ContasRepository')
    private contaRepository: IContasRepository
  ) {}
  async execute(idConta: number, status: boolean): Promise<Contas> {
    const conta = await this.contaRepository.findOne(idConta);

    if (!conta) {
      throw new AppError('Não foi possível identificar a conta', 404);
    }

    conta.flagAtivo = status;

    await this.contaRepository.create(conta);

    return conta;
  }
}

export { BlockContaUseCase };
