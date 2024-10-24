import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [
        { email: login },
        { cpf: login },
      ],
    });

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<User | null> {
    const { login, password } = loginDto;
    return this.validateUser(login, password);
  }

  async register(registerDto: RegisterDto): Promise<User> { // Adicione a criptografia aqui
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
