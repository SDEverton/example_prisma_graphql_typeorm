import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pessoas1630365973318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Pessoas',
        columns: [
          {
            name: 'idPessoa',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'dataNascimento',
            type: 'timestamp',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Pessoas');
  }
}
