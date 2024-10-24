import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    console.log(file); // Apenas para verificar se o arquivo está sendo recebido corretamente
    // Lógica para salvar o PDF
  }
}
