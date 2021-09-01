import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePessoaUseCase } from './CreatePessoaUseCase';

class CreatePessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, cpf, dataNascimento } = request.body;

    const createUserUseCase = container.resolve(CreatePessoaUseCase);

    await createUserUseCase.execute({
      nome,
      cpf,
      dataNascimento,
    });

    return response.status(201).send();
  }
}

export { CreatePessoaController };
