import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateContaUseCase } from './CreateContaUseCase';

class CreateContaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      flagAtivo,
      idPessoa,
      limiteSaqueDiario,
      saldo,
      tipoConta,
    } = request.body;

    const createUserUseCase = container.resolve(CreateContaUseCase);

    const data = await createUserUseCase.execute({
      flagAtivo,
      idPessoa,
      limiteSaqueDiario,
      saldo,
      tipoConta,
    });

    return response.status(200).json(data);
  }
}

export { CreateContaController };
