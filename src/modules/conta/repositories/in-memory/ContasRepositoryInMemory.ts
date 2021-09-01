import { ICreateContasDTO } from '@modules/conta/dtos/ICreateContasDTO';
import { Contas } from '@modules/conta/infra/typeorm/entities/Contas';

import { IContasRepository } from '../IConstasRepository';

class ContasRepositoryInMemory implements IContasRepository {
  contas: Contas[] = [];

  async create(data: ICreateContasDTO): Promise<Contas> {
    const conta = new Contas();

    Object.assign(data, { idConta: 1 });
    Object.assign(conta, data);

    this.contas.push(conta);

    return conta;
  }

  async findOne(id: number): Promise<Contas> {
    return this.contas.find((conta) => conta.idConta === id);
  }

  async extract(
    idConta: number,
    initialDate: string,
    finishDate: string
  ): Promise<Contas> {
    return this.contas.find((conta) => conta.idConta === idConta);
  }
}

export { ContasRepositoryInMemory };
