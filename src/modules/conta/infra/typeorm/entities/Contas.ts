import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Pessoas } from '@modules/pessoas/infra/typeorm/entities/Pessoas';
import { Transacoes } from '@modules/transacoes/infra/typeorm/entities/Transacoes';

@Entity('Contas')
class Contas {
  @PrimaryGeneratedColumn('increment')
  idConta: number;

  @Column()
  idPessoa: number;

  @Column('decimal', { precision: 8, scale: 2 })
  saldo: number;

  @Column('decimal', { precision: 8, scale: 2 })
  limiteSaqueDiario: number;

  @Column()
  flagAtivo: boolean;

  @Column()
  tipoConta: number;

  @Column()
  dataCriacao: Date;

  @ManyToOne(() => Pessoas, (pessoas) => pessoas.idPessoa)
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoas;

  @OneToMany(() => Transacoes, (transacoes) => transacoes.contas)
  transacoes: Transacoes;
}

export { Contas };
