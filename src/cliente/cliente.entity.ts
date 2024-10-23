import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefone: string;

  @Column()
  endereco: string;

  @Column()
  senhaGovBr: string;

  @Column()
  dataNascimento: Date;

  @Column('blob')
  pdf: Buffer;

  @Column()
  senhaSistema: string;
}
