import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/auth';

@Injectable()
export class UserService {
  constructor(protected auth: Auth) {}

  async register(createUserDto: CreateUserDto) {
    this.checkRegisterFields(createUserDto);
    const token = await this.auth.signIn(createUserDto);

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

    if (err) {
      throw new HttpException({ errors }, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
