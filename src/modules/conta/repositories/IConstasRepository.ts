import { ICreateContasDTO } from '../dtos/ICreateContasDTO';
import { Contas } from '../infra/typeorm/entities/Contas';

interface IContasRepository {
  create(data: ICreateContasDTO): Promise<Contas>;
  findOne(id: number): Promise<Contas>;
  extract(
    idConta: number,
    initialDate: string,
    finishDate: string
  ): Promise<Contas>;
}

export { IContasRepository };
