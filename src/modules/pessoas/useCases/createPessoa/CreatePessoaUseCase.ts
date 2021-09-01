import { inject, injectable } from 'tsyringe';

import { ICreatePessoasDTO } from '@modules/pessoas/dtos/ICreatePessoasDTO';
import { Pessoas } from '@modules/pessoas/infra/typeorm/entities/Pessoas';
import { IPessoasRepository } from '@modules/pessoas/repositories/IPessoasRepository';

@injectable()
class CreatePessoaUseCase {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository
  ) {}
  async execute({
    nome,
    cpf,
    dataNascimento,
  }: ICreatePessoasDTO): Promise<Pessoas> {
    const user = await this.pessoasRepository.create({
      nome,
      cpf,
      dataNascimento,
    });

    return user;
  }
}

export { CreatePessoaUseCase };
