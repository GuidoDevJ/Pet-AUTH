/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { getHassPassword, hassPassword } from 'src/helpers/securePassword';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}
  async createAuthData(createAuthDto: CreateAuthDto) {
    try {
      const existEmail = await this.findOne(createAuthDto.email);
      if (existEmail)
        throw new HttpException({ msg: 'Usuario ya existe en base' }, 409);
      const user = await this.authModel.create(createAuthDto);
      return {
        ...user,
        token: this.jwtService.sign({ email: user.email }),
      };
    } catch (error) {
      throw error;
    }
  }
  private async findOne(email: string) {
    try {
      const responseDbAuth = await this.authModel.findOne({
        email: email,
      });
      return responseDbAuth;
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(updateAuthDto: UpdateAuthDto) {
    const password = hassPassword(updateAuthDto.password);
    try {
      await this.authModel.findOneAndUpdate(
        { email: updateAuthDto.email },
        { password },
      );
      return { msg: 'Contraseña actualizada' };
    } catch (error) {
      console.log(error);
    }
  }
  async login(login: LoginDto, hassPassword: string) {
    console.log(login);
    console.log('Llegue al service');
    try {
      console.log(hassPassword);
      if (!getHassPassword(hassPassword, login.password))
        throw new HttpException({ msg: 'Contraseña incorrecta' }, 401);
      return {
        msg: 'Login correcto',
      };
    } catch (error) {
      return error.response;
    }
  }
}
