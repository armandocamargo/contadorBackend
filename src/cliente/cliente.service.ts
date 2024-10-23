import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Cliente } from './entities/cliente.entity';


@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(id: number): Promise<Cliente> {
    const options: FindOneOptions<Cliente> = { where: { id } };
    return this.clienteRepository.findOne(options);
  }
}
