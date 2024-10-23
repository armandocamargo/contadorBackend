import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [{ email: loginDto.login }, { cpf: loginDto.login }],
    });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }
}
