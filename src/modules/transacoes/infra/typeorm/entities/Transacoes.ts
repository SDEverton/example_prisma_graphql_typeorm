import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Contas } from '@modules/conta/infra/typeorm/entities/Contas';

@Entity('Transacoes')
class Transacoes {
  @PrimaryGeneratedColumn('increment')
  idTransacao: number;

  @Column()
  idConta: number;

  @Column()
  valor: number;

  @Column()
  dataTransacao: Date;

  @ManyToOne(() => Contas, (contas) => contas.transacoes)
  @JoinColumn({ name: 'idConta' })
  contas: Contas;
}

export { Transacoes };
