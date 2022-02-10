import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

export type Data = {
  first_name?: string;
  last_name?: string;
  preferred_name?: string;
  email?: string;
  password?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state_code?: string;
  zip?: string;
  service_area_code?: string;
  date_of_birth?: string;
  download_link_option?: boolean;
  gender?: string;
  gender_details?: string;
  phone_number?: string;
  term_accepted?: boolean;
};

export type TokenPayload = {
  id: number;
};

@Injectable()
export class RegisterService {
  constructor(private storageService: StorageService) {}

  async save(data: Data): Promise<number> {
    const entity = await this.storageService.save(data);
    return entity.id;
  }

  async update(id: number, data: Data): Promise<UpdateResult> {
    const updateResult = await this.storageService.update(id, data);
    return updateResult;
  }
}
