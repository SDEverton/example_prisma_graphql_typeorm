import { ICreateTransacoesDTO } from '@modules/transacoes/dtos/ICreateTransacoesDTO';
import { Transacoes } from '@modules/transacoes/infra/typeorm/entities/Transacoes';

import { ITransacoesRepository } from '../ITransacoesRepository';

class TransacoesRepositoryInMemory implements ITransacoesRepository {
  transacoes: Transacoes[] = [];

  async create(data: ICreateTransacoesDTO): Promise<Transacoes> {
    const transacao = new Transacoes();

    Object.assign(data, { idTransacao: 1 });
    Object.assign(transacao, data);

    this.transacoes.push(transacao);

    return transacao;
  }
  async extractByPeriod(
    idConta: number,
    initialDate: string,
    finishDate: string
  ): Promise<Transacoes[]> {
    throw new Error('Method not implemented.');
  }
}

export { TransacoesRepositoryInMemory };
