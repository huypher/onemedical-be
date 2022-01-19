export interface LoginInfoReq {
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string;
  password: string;
}

export interface LoginInfoResp {
  verdict: string;
  message: string;
  data: {
    token: string;
  };
}

export interface AddressInfoReq {
  address: {
    address1: string;
    address2: string;
    city: string;
    state_code: string;
    zip: string;
  };
  service_area_code: string;
}

export interface AddressInfoResp {
  verdict: string;
  message: string;
  data: any;
}

export interface PersonalInfoReq {
  date_of_birth: string;
  download_link_option: boolean;
  gender: string;
  gender_details: string;
  phone_number: string;
}

export interface PersonalInfoResp {
  verdict: string;
  message: string;
  data: any;
}

export interface TermAgreementReq {
  term_accepted: boolean;
}

export interface TermAgreementResp {
  verdict: string;
  message: string;
  data: any;
}
