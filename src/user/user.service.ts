import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(protected auth: Auth, protected prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const checkedUser = this.checkRegisterFields(createUserDto);

    const { name, password } = checkedUser;

    const hashPass = hashSync(password, 8);
    const data = {
      name,
      password: hashPass,
    };

    const user = await this.prisma.user.create({ data }).catch((error) => {
      if (error?.meta?.target?.includes('name')) {
        throw new HttpException(
          { errors: { name: 'User already exists' } },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        { errors: { general: error.message } },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    const { id } = user;

    const token = await this.auth.signIn({ id, name });

    return { token };
  }

  async login(createUserDto: CreateUserDto) {
    const checkedUser = this.checkRegisterFields(createUserDto);

    const { name, password } = checkedUser;
    const errorMessage = 'user name and/or password is invalid';

    const user = await this.prisma.user
      .findUnique({
        where: { name },
        select: {
          id: true,
          name: true,
          password: true,
        },
      })
      .catch(() => {
        throw new HttpException(
          { errors: { general: 'Find user error' } },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (!user) {
      throw new HttpException(
        { errors: { general: errorMessage } },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { password: hashedPassword, ...payload } = user;

    const isValidPass = compareSync(password, hashedPassword);

    if (!isValidPass) {
      throw new HttpException(
        { errors: { general: errorMessage } },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const token = await this.auth.signIn(payload);
    return { token };
  }

  protected checkRegisterFields(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    let err = false;
    const errors: Record<string, any> = {};

    if (!name) {
      err = true;
      errors.name = 'User name is required';
    }

    if (name?.length && name.includes(' ')) {
      err = true;
      errors.name = "User names can't have spaces";
    }

    if (name?.length > 200) {
      err = true;
      errors.name = 'User name maximun length is 200 characters';
    }

    if (!password) {
      err = true;
      errors.password = 'password is required';
    }

    if (password?.length && password.includes(' ')) {
      err = true;
      errors.password = "passwords can't have spaces";
    }

    if (password?.length > 50) {
      err = true;
      errors.password = 'password maximun length is 50 characters';
    }

    if (password?.length < 8) {
      err = true;
      errors.password = 'password minimum length is 8 characters';
    }

    if (password?.length && password.includes(' ')) {
      err = true;
      errors.password = "passwords can't have spaces";
    }

    if (err) {
      throw new HttpException({ errors }, HttpStatus.NOT_ACCEPTABLE);
    }

    return { name, password };
  }
}
