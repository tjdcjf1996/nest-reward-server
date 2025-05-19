import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { AuthModule } from '../../auth/auth.module';

@Global()
@Module({
  imports: [HttpModule, AuthModule],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
