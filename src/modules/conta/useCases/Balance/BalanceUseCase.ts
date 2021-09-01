import { inject, injectable } from 'tsyringe';

import { Contas } from '@modules/conta/infra/typeorm/entities/Contas';
import { IContasRepository } from '@modules/conta/repositories/IConstasRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class BalanceUseCase {
  constructor(
    @inject('ContasRepository')
    private contaRepository: IContasRepository
  ) {}
  async execute(idConta: number): Promise<Contas> {
    const conta = await this.contaRepository.findOne(idConta);

    if (!conta) {
      throw new AppError('Não foi possível identificar a conta', 404);
    }

    if (!conta.flagAtivo) {
      throw new AppError('Essa conta enconta-se bloqueada', 401);
    }

    return conta;
  }
}

export { BalanceUseCase };
