import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private users = [
    {
      id: 1,
      name: 'Uran',
      email: 'uran@email.com',
      password: 'uran123',
    },
    {
      id: 2,
      name: 'Deivid',
      email: 'deivid@email.com',
      password: 'deivid123',
    },
  ];

  async create({ email, password, firstName, lastName }: RegisterDto) {
    const exisingUser = await this.usersRepository.findOneBy({ email });

    if (exisingUser) return { message: 'Email is taken', status: false };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.save(
      new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      }),
    );

    return { message: 'Register successfully', status: true, user };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
