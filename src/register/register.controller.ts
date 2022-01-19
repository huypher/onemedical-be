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
import { randomBytes } from 'crypto';
import { storage, data } from './storage';
import { getToken } from '../util/jwt';

export const storageInstance = new storage();

@Controller('register')
export class RegisterController {
  @Post('login-info')
  saveLoginInfo(@Body() loginInfoReq: LoginInfoReq, @Res() res: Response) {
    const token = randomBytes(64).toString('hex');
    const data: data = {
      first_name: loginInfoReq.first_name,
      last_name: loginInfoReq.last_name,
      preferred_name: loginInfoReq.preferred_name,
      email: loginInfoReq.email,
      password: loginInfoReq.password,
    };
    storageInstance.addData(token, data);
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
  saveAddressInfo(
    @Headers('Authorization') auth: string,
    @Body() addressInfoReq: AddressInfoReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const data: data = {
      address1: addressInfoReq.address.address1,
      address2: addressInfoReq.address.address2,
      city: addressInfoReq.address.city,
      state_code: addressInfoReq.address.state_code,
      zip: addressInfoReq.address.zip,
      service_area_code: addressInfoReq.service_area_code,
    };
    storageInstance.addData(token, data);
    const resp: AddressInfoResp = {
      verdict: verdict_success,
      message: 'success',
      data: null,
    };
    res.status(HttpStatus.OK).json(resp);
  }

  @Post('personal-info')
  savePersonalInfo(
    @Headers('Authorization') auth: string,
    @Body() personalInfoReq: PersonalInfoReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const data: data = {
      date_of_birth: personalInfoReq.date_of_birth,
      download_link_option: personalInfoReq.download_link_option,
      gender: personalInfoReq.gender,
      gender_details: personalInfoReq.gender_details,
      phone_number: personalInfoReq.phone_number,
    };
    storageInstance.addData(token, data);
    const resp: PersonalInfoResp = {
      verdict: verdict_success,
      message: 'success',
      data: null,
    };
    res.status(HttpStatus.OK).json(resp);
  }

  @Post('term-agreement')
  saveTermAgreement(
    @Headers('Authorization') auth: string,
    @Body() termAgreementReq: TermAgreementReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const data: data = {
      term_accepted: termAgreementReq.term_accepted,
    };
    storageInstance.addData(token, data);
    storageInstance.persistData(token);
    const resp: TermAgreementResp = {
      verdict: verdict_success,
      message: 'success',
      data: null,
    };
    res.status(HttpStatus.OK).json(resp);
  }
}
