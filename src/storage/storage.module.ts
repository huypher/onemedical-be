import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from './storage.service';
import { DataEntity } from './data.entity';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([DataEntity])],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
