import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataEntity } from './data.entity';
import { Data } from '../register/register.service';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(DataEntity)
    private dataRepository: Repository<DataEntity>,
  ) {}

  async save(data: Data): Promise<DataEntity> {
    const entity = await this.dataRepository.create(data);
    return await this.dataRepository.save(entity);
  }
}
