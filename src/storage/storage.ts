import { writeData } from '../util/sheets/sheet';
import {
  CACHE_MANAGER,
  CacheModule,
  Inject,
  Injectable,
  Module,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { cacheTTL } from '../constant';

export type data = {
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

@Module({
  imports: [CacheModule.register()],
})
@Injectable()
export class Storage {
  email: string;
  key: string;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async addData(key: string, data: data) {
    const value = await this.cacheManager.get<data>(key);
    if (!value) {
      await this.cacheManager.set(key, data, { ttl: cacheTTL });
      return;
    }
    const newData = { ...value, ...data };
    await this.cacheManager.set(key, newData, { ttl: cacheTTL });
  }

  async persistData(key: string) {
    const value = await this.cacheManager.get<data>(key);
    if (!value) {
      return;
    }
    const data: Array<any> = Object.values(value);
    writeData(process.env.SHEET_ID, process.env.SHEET_PAGE, [data]).then(() => {
      this.cacheManager.del(key);
    });
  }
}
