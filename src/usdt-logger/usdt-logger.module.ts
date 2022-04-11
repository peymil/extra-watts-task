import { Module } from '@nestjs/common';
import { ContractModule } from 'src/contract/contract.module';
import { Approval, Transaction } from './entities';
import { UsdtLoggerController } from './usdt-logger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ContractModule, TypeOrmModule.forFeature([Transaction, Approval])],
  controllers: [UsdtLoggerController],
})
export class UsdtLoggerModule {}
