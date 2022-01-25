import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  preferred_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  city: string;

  @Column()
  state_code: string;

  @Column()
  zip: string;

  @Column()
  service_area_code: string;

  @Column()
  date_of_birth: string;

  @Column()
  download_link_option: boolean;

  @Column()
  gender: string;

  @Column()
  gender_details: string;

  @Column()
  phone_number: string;

  @Column()
  term_accepted: boolean;
}

export default DataEntity;
