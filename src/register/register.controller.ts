import {
  Headers,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Module,
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
import { getToken } from '../util/jwt';
import { StorageModule } from '../storage/storage.module';
import { Data, RegisterService } from './register.service';

// @Module({
//   imports: [StorageModule],
// })
@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('login-info')
  saveLoginInfo(@Body() loginInfoReq: LoginInfoReq, @Res() res: Response) {
    const token = randomBytes(64).toString('hex');
    const data: Data = {
      first_name: loginInfoReq.first_name,
      last_name: loginInfoReq.last_name,
      preferred_name: loginInfoReq.preferred_name,
      email: loginInfoReq.email,
      password: loginInfoReq.password,
    };
    this.registerService.addData(token, data).then(() => {
      const resp: LoginInfoResp = {
        verdict: verdict_success,
        message: 'success',
        data: {
          token: token,
        },
      };
      res.status(HttpStatus.OK).json(resp);
    });
  }

  @Post('address-info')
  saveAddressInfo(
    @Headers('Authorization') auth: string,
    @Body() addressInfoReq: AddressInfoReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const data: Data = {
      address1: addressInfoReq.address.address1,
      address2: addressInfoReq.address.address2,
      city: addressInfoReq.address.city,
      state_code: addressInfoReq.address.state_code,
      zip: addressInfoReq.address.zip,
      service_area_code: addressInfoReq.service_area_code,
    };
    this.registerService.addData(token, data).then(() => {
      const resp: AddressInfoResp = {
        verdict: verdict_success,
        message: 'success',
        data: null,
      };
      res.status(HttpStatus.OK).json(resp);
    });
  }

  @Post('personal-info')
  savePersonalInfo(
    @Headers('Authorization') auth: string,
    @Body() personalInfoReq: PersonalInfoReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const data: Data = {
      date_of_birth: personalInfoReq.date_of_birth,
      download_link_option: personalInfoReq.download_link_option,
      gender: personalInfoReq.gender,
      gender_details: personalInfoReq.gender_details,
      phone_number: personalInfoReq.phone_number,
    };
    this.registerService.addData(token, data).then(() => {
      const resp: PersonalInfoResp = {
        verdict: verdict_success,
        message: 'success',
        data: null,
      };
      res.status(HttpStatus.OK).json(resp);
    });
  }

  @Post('term-agreement')
  saveTermAgreement(
    @Headers('Authorization') auth: string,
    @Body() termAgreementReq: TermAgreementReq,
    @Res() res: Response,
  ) {
    const token = getToken(auth);
    const data: Data = {
      term_accepted: termAgreementReq.term_accepted,
    };
    this.registerService.addData(token, data).then(() => {
      this.registerService.persistData(token).then(() => {
        const resp: TermAgreementResp = {
          verdict: verdict_success,
          message: 'success',
          data: null,
        };
        res.status(HttpStatus.OK).json(resp);
      });
    });
  }
}
