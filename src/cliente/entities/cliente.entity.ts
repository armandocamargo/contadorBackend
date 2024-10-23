import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  endereco: string;

  @Column()
  senhaGovBr: string;

  @Column()
  dataNascimento: string;

  @Column('blob')
  pdf: Buffer;

  @Column()
  senhaSistema: string;
}
