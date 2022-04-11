import { Module } from '@nestjs/common';
import { blockchainProviders } from './blockhain.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: blockchainProviders,
  exports: blockchainProviders,
})
export class BlockchainModule {}
