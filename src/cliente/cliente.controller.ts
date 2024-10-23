import { Controller, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clienteService.findOne(id);
  }
}
