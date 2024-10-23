import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async criar(usuario: Usuario): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
    return this.usuarioRepository.save(usuario);
  }

  async validarLogin(cpfOuEmail: string, senha: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: [{ cpf: cpfOuEmail }, { email: cpfOuEmail }],
    });
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      return usuario;
    }
    return null;
  }
}
