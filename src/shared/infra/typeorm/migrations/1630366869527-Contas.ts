import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Contas1630366869527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Contas',
        columns: [
          {
            name: 'idConta',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'idPessoa',
            type: 'int',
          },
          {
            name: 'saldo',
            type: 'double precision',
          },
          {
            name: 'limiteSaqueDiario',
            type: 'double precision',
          },
          {
            name: 'flagAtivo',
            type: 'boolean',
          },
          {
            name: 'tipoConta',
            type: 'numeric',
          },
          {
            name: 'dataCriacao',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'FKPessoas',
            referencedTableName: 'Pessoas',
            referencedColumnNames: ['idPessoa'],
            columnNames: ['idPessoa'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Contas');
  }
}
