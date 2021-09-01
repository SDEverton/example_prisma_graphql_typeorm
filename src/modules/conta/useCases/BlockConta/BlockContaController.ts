import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BlockContaUseCase } from './BlockContaUseCase';

class BlockContaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { status } = request.body;
    const { idConta } = request.params;

    const createUserUseCase = container.resolve(BlockContaUseCase);

    await createUserUseCase.execute(Number(idConta), status);

    return response.status(201).send();
  }
}

export { BlockContaController };
