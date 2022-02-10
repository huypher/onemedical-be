import {
  Headers,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  AddressInfoReq,
  AddressInfoResp,
  LoginInfoReq,
  LoginInfoResp,
  PersonalInfoReq,
  PersonalInfoResp,
  TermAgreementReq,
  TermAgreementResp,
} from './type';
import { verdict_success } from '../constant';
import { getToken } from '../util/jwt';
import { JwtService } from '@nestjs/jwt';
import { Data, RegisterService, TokenPayload } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(
    private jwtService: JwtService,
    private registerService: RegisterService,
  ) {}

  @Post('login-info')
  async saveLoginInfo(
    @Body() loginInfoReq: LoginInfoReq,
    @Res() res: Response,
  ) {
    const data: Data = {
      first_name: loginInfoReq.first_name,
      last_name: loginInfoReq.last_name,
      preferred_name: loginInfoReq.preferred_name,
      email: loginInfoReq.email,
      password: loginInfoReq.password,
    };
    const id = await this.registerService.save(data);
    const payload: TokenPayload = { id: id };
    const token = this.jwtService.sign(payload);
    const resp: LoginInfoResp = {
      verdict: verdict_success,
      message: 'success',
      data: {
        token: token,
      },
    };
    res.status(HttpStatus.OK).json(resp);
  }

  @Post('address-info')
  async saveAddressInfo(
    @Headers('Authorization') auth: string,
    @Body() addressInfoReq: AddressInfoReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const payload = this.jwtService.decode(token);
    const id = payload['id'];
    const data: Data = {
      address1: addressInfoReq.address.address1,
      address2: addressInfoReq.address.address2,
      city: addressInfoReq.address.city,
      state_code: addressInfoReq.address.state_code,
      zip: addressInfoReq.address.zip,
      service_area_code: addressInfoReq.service_area_code,
    };

    await this.registerService.update(id, data);
    const resp: AddressInfoResp = {
      verdict: verdict_success,
      message: 'success',
      data: null,
    };
    res.status(HttpStatus.OK).json(resp);
  }

  @Post('personal-info')
  async savePersonalInfo(
    @Headers('Authorization') auth: string,
    @Body() personalInfoReq: PersonalInfoReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const payload = this.jwtService.decode(token);
    const id = payload['id'];
    const data: Data = {
      date_of_birth: personalInfoReq.date_of_birth,
      download_link_option: personalInfoReq.download_link_option,
      gender: personalInfoReq.gender,
      gender_details: personalInfoReq.gender_details,
      phone_number: personalInfoReq.phone_number,
    };

    await this.registerService.update(id, data);
    const resp: PersonalInfoResp = {
      verdict: verdict_success,
      message: 'success',
      data: null,
    };
    res.status(HttpStatus.OK).json(resp);
  }

  @Post('term-agreement')
  async saveTermAgreement(
    @Headers('Authorization') auth: string,
    @Body() termAgreementReq: TermAgreementReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const payload = this.jwtService.decode(token);
    const id = payload['id'];
    const data: Data = {
      term_accepted: termAgreementReq.term_accepted,
    };

    await this.registerService.update(id, data);
    const resp: TermAgreementResp = {
      verdict: verdict_success,
      message: 'success',
      data: null,
    };
    res.status(HttpStatus.OK).json(resp);
  }
}
