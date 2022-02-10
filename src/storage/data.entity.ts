import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  preferred_name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state_code: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  service_area_code: string;

  @Column({ nullable: true })
  date_of_birth: string;

  @Column({ nullable: true })
  download_link_option: boolean;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  gender_details: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  term_accepted: boolean;
}

export default DataEntity;
