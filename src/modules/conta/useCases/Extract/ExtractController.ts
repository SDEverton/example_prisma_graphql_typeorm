import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ExtractUseCase } from './ExtractUseCase';

class ExtractController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idConta, initialDate, finishDate } = request.body;

    const extractUseCase = container.resolve(ExtractUseCase);

    const data = await extractUseCase.execute(idConta, initialDate, finishDate);

    return response.status(200).json(data);
  }
}

export { ExtractController };
