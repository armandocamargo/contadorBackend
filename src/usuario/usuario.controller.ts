import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'; // Ajuste a importação se necessário
import { User } from '../user/user.entity'; // Certifique-se de importar User

@Controller('usuario') // Verifique se a rota está correta
export class UsuarioController {
  constructor(private readonly authService: AuthService) {}

  @Post('registrar')
  async registrar(@Body() usuario: User) { // Substitua Usuario por User
    return this.authService.register(usuario);
  }
}
