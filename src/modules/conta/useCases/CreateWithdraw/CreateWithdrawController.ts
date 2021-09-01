import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateWithdrawUseCase } from './CreateWithdrawUseCase';

class CreateWithdrawController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idConta, valor } = request.body;

    const createUserUseCase = container.resolve(CreateWithdrawUseCase);

    const data = await createUserUseCase.execute(idConta, valor);

    return response.status(200).json(data);
  }
}

export { CreateWithdrawController };
