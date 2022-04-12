import { Module } from '@nestjs/common';
import { ContractModule } from 'src/contract/contract.module';
import { Approval, Transaction } from './entities';
import { UsdtListener } from './usdt.listener';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ContractModule,
    UsdtListener,
    TypeOrmModule.forFeature([Transaction, Approval]),
  ],
})
export class UsdtLoggerModule {}
