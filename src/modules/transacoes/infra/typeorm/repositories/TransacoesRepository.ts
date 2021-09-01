import { parseISO } from 'date-fns';
import { getRepository, Repository, Between } from 'typeorm';

import { ICreateTransacoesDTO } from '@modules/transacoes/dtos/ICreateTransacoesDTO';
import { ITransacoesRepository } from '@modules/transacoes/repositories/ITransacoesRepository';

import { Transacoes } from '../entities/Transacoes';

class TransacoesRepository implements ITransacoesRepository {
  private repository: Repository<Transacoes>;

  constructor() {
    this.repository = getRepository(Transacoes);
  }

  async create(data: ICreateTransacoesDTO): Promise<Transacoes> {
    const transacao = this.repository.create(data);

    await this.repository.save(transacao);

    return transacao;
  }

  async extractByPeriod(
    idConta: number,
    initialDate: string,
    finishDate: string
  ): Promise<Transacoes[]> {
    const AfterDate = () =>
      Between(parseISO(initialDate), parseISO(finishDate));

    return this.repository.find({
      where: { idConta, dataTransacao: AfterDate() },
      relations: ['contas'],
    });
  }
}

export { TransacoesRepository };
