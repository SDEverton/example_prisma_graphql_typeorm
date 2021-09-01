import { parseISO } from 'date-fns';
import { getRepository, Repository, Between } from 'typeorm';

import { ICreateContasDTO } from '@modules/conta/dtos/ICreateContasDTO';
import { IContasRepository } from '@modules/conta/repositories/IConstasRepository';

import { Contas } from '../entities/Contas';

class ContasRepository implements IContasRepository {
  private repository: Repository<Contas>;

  constructor() {
    this.repository = getRepository(Contas);
  }

  async create(data: ICreateContasDTO): Promise<Contas> {
    const conta = this.repository.create(data);

    await this.repository.save(conta);

    return conta;
  }

  async findOne(id: number): Promise<Contas> {
    return this.repository.findOne(id);
  }

  async extract(
    idConta: number,
    initialDate: string,
    finishDate: string
  ): Promise<Contas> {
    return this.repository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.transacoes', 'transacoes')
      .leftJoinAndSelect('c.pessoa', 'pessoa')
      .where('c.idConta = :idConta', { idConta })
      .andWhere(
        `transacoes.dataTransacao BETWEEN '${initialDate} 12:24:27.563' AND '${finishDate} 12:24:27.563'`
      )
      .getOne();
  }
}

export { ContasRepository };
