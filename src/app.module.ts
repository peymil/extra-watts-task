import { Module } from '@nestjs/common';
import { ContractModule } from './contract/contract.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { UsdtLoggerModule } from './usdt-logger/usdt-logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    BlockchainModule,
    ContractModule,
    UsdtLoggerModule,
  ],
})
export class AppModule {}
