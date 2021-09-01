import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Pessoas')
class Pessoas {
  @PrimaryGeneratedColumn('increment')
  idPessoa: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  dataNascimento: Date;
}

export { Pessoas };
