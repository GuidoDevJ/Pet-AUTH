/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseInterceptors,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CustomInterceptor } from './decorators';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/createAuth')
  @HttpCode(201)
  @UseInterceptors(CustomInterceptor)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createAuthData(createAuthDto);
  }
  @Post('/login')
  @UseGuards(AuthGuard())
  login(@Body() body: LoginDto, @Req() req: any) {
    return this.authService.login(body, req.user.password);
  }
  @Patch('/updatePassword')
  updatePassword(@Body() updatePasswordDto: UpdateAuthDto) {
    return this.authService.updatePassword(updatePasswordDto);
  }
}
