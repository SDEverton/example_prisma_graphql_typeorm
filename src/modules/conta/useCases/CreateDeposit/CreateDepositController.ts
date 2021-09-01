import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDepositUseCase } from './CreateDepositUseCase';

class CreateDepositController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idConta, valor } = request.body;

    const createUserUseCase = container.resolve(CreateDepositUseCase);

    await createUserUseCase.execute(idConta, valor);

    return response.status(201).send();
  }
}

export { CreateDepositController };
