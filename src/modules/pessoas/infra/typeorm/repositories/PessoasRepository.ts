import { getRepository, Repository } from 'typeorm';

import { ICreatePessoasDTO } from '@modules/pessoas/dtos/ICreatePessoasDTO';
import { IPessoasRepository } from '@modules/pessoas/repositories/IPessoasRepository';

import { Pessoas } from '../entities/Pessoas';

class PessoasRepository implements IPessoasRepository {
  private repository: Repository<Pessoas>;

  constructor() {
    this.repository = getRepository(Pessoas);
  }

  async create({
    nome,
    cpf,
    dataNascimento,
    idPessoa,
  }: ICreatePessoasDTO): Promise<Pessoas> {
    const user = this.repository.create({
      nome,
      cpf,
      dataNascimento,
      idPessoa,
    });

    await this.repository.save(user);

    return user;
  }
}

export { PessoasRepository };
