import { ICreateTransacoesDTO } from '../dtos/ICreateTransacoesDTO';
import { Transacoes } from '../infra/typeorm/entities/Transacoes';

interface ITransacoesRepository {
  create(data: ICreateTransacoesDTO): Promise<Transacoes>;
  extractByPeriod(
    idConta: number,
    initialDate: string,
    finishDate: string
  ): Promise<Transacoes[]>;
}

export { ITransacoesRepository };
