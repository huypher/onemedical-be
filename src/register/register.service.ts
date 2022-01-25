import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { cacheTTL } from '../constant';
import { Cache } from 'cache-manager';
import { StorageService } from '../storage/storage.service';

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

@Injectable()
export class RegisterService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private storageService: StorageService,
  ) {}

  async addData(key: string, data: Data) {
    const value = await this.cacheManager.get<Data>(key);
    if (!value) {
      await this.cacheManager.set(key, data, { ttl: cacheTTL });
      return;
    }
    const newData = { ...value, ...data };
    await this.cacheManager.set(key, newData, { ttl: cacheTTL });
  }

  async persistData(key: string) {
    const value = await this.cacheManager.get<Data>(key);
    if (!value) {
      return;
    }
    this.storageService.save(value).then(() => {
      this.cacheManager.del(key);
    });
  }
}
