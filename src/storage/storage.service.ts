import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataEntity } from './data.entity';
import { Data } from '../register/register.service';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

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

  async update(id: number, data: Data): Promise<UpdateResult> {
    const updateResult = await this.dataRepository.update(id, data);
    return updateResult;
  }
}
