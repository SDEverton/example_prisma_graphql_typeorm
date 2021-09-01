import { container } from 'tsyringe';

import { ContasRepository } from '@modules/conta/infra/typeorm/repositories/ContasRepository';
import { IContasRepository } from '@modules/conta/repositories/IConstasRepository';
import { PessoasRepository } from '@modules/pessoas/infra/typeorm/repositories/PessoasRepository';
import { IPessoasRepository } from '@modules/pessoas/repositories/IPessoasRepository';
import { TransacoesRepository } from '@modules/transacoes/infra/typeorm/repositories/TransacoesRepository';
import { ITransacoesRepository } from '@modules/transacoes/repositories/ITransacoesRepository';

container.registerSingleton<IPessoasRepository>(
  'PessoasRepository',
  PessoasRepository
);

container.registerSingleton<IContasRepository>(
  'ContasRepository',
  ContasRepository
);

container.registerSingleton<ITransacoesRepository>(
  'TransacoesRepository',
  TransacoesRepository
);
