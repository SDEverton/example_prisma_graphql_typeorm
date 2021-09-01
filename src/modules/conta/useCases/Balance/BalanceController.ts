import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BalanceUseCase } from './BalanceUseCase';

class BalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idConta } = request.params;

    const balanceUseCase = container.resolve(BalanceUseCase);

    const data = await balanceUseCase.execute(Number(idConta));

    return response.status(200).json({ saldo: data.saldo });
  }
}

export { BalanceController };
