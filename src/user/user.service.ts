import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(protected auth: Auth, protected prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    this.checkRegisterFields(createUserDto);

    const { name, password } = createUserDto;

    const hashPass = hashSync(password, 8);
    const data = {
      name,
      password: hashPass,
    };

    const user = await this.prisma.user.create({ data }).catch((error) => {
      if (error?.meta?.target?.includes('name')) {
        throw new HttpException(
          { message: 'User already exists' },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    const { id } = user;

    const token = await this.auth.signIn({ id, name });

    console.log(await this.auth.verifyAndDecodeToken(token));

    return { token };
  }

  async login(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  protected checkRegisterFields(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    let err = false;
    const errors: Record<string, any> = {};

    if (!name) {
      err = true;
      errors.username = 'username is required';
    }

    if (name?.length > 200) {
      err = true;
      errors.username = 'username max length is 200 characters';
    }

    if (!password) {
      err = true;
      errors.password = 'password is required';
    }

    if (password?.length > 50) {
      err = true;
      errors.password = 'password max length is 50 characters';
    }

    if (password?.length < 8) {
      err = true;
      errors.password = 'password min length is 8 characters';
    }

    if (err) {
      throw new HttpException({ errors }, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
