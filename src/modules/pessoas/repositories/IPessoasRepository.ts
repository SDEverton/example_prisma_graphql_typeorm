import { ICreatePessoasDTO } from '../dtos/ICreatePessoasDTO';
import { Pessoas } from '../infra/typeorm/entities/Pessoas';

interface IPessoasRepository {
  create(data: ICreatePessoasDTO): Promise<Pessoas>;
}

export { IPessoasRepository };
