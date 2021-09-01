import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Transacoes1630367538487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Transacoes',
        columns: [
          {
            name: 'idTransacao',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'idConta',
            type: 'int',
          },
          {
            name: 'valor',
            type: 'double precision',
          },
          {
            name: 'dataTransacao',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'FKContas',
            referencedTableName: 'Contas',
            referencedColumnNames: ['idConta'],
            columnNames: ['idConta'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Transacoes');
  }
}
