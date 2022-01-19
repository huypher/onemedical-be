import { writeData } from '../util/sheets/sheet';

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

export type storageField = { [key: string]: data };

export class storage {
  instance: storageField;
  constructor() {
    this.instance = {};
  }

  addData(key: string, data: data) {
    if (!this.instance[key]) {
      this.instance[key] = data;
      return;
    }
    const currentData = this.instance[key];
    const newData = { ...currentData, ...data };
    this.instance[key] = newData;
  }

  persistData(key: string) {
    if (!this.instance[key]) {
      return;
    }
    const data: Array<any> = Object.values(this.instance[key]);
    writeData('1ZjD6i3c2ceRnaPZNPr-WDuUAxRueKJqPzKtAeLE9so4', 'test', [
      data,
    ]).then();
  }
}
