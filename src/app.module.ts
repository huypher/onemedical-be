import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './register/register.controller';
import { ConfigModule } from '@nestjs/config';
import { Storage } from './storage/storage';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [AppController, RegisterController],
  providers: [AppService, Storage],
})
export class AppModule {}
