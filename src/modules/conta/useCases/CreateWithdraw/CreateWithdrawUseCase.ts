import { inject, injectable } from 'tsyringe';

import { Contas } from '@modules/conta/infra/typeorm/entities/Contas';
import { IContasRepository } from '@modules/conta/repositories/IConstasRepository';
import { ITransacoesRepository } from '@modules/transacoes/repositories/ITransacoesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateWithdrawUseCase {
  constructor(
    @inject('ContasRepository')
    private contaRepository: IContasRepository,
    @inject('TransacoesRepository')
    private transacoesRepository: ITransacoesRepository
  ) {}
  async execute(idConta: number, valor: number): Promise<Contas> {
    const conta = await this.contaRepository.findOne(idConta);

    if (!conta) {
      throw new AppError('Não foi possível identificar a conta', 404);
    }

    if (!conta.flagAtivo) {
      throw new AppError('Essa conta enconta-se bloqueada', 401);
    }

    if (conta.saldo < valor) {
      throw new AppError(
        `Seu saldo (${conta.saldo}) é menor que o valor que deseja sacar (${valor})`,
        403
      );
    }

    conta.saldo -= valor;

    await this.contaRepository.create(conta);
    await this.transacoesRepository.create({
      idConta,
      valor: valor * -1,
      dataTransacao: new Date(),
    });

    return conta;
  }
}

export { CreateWithdrawUseCase };
