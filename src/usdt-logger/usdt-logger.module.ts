import { Module } from '@nestjs/common';
import { ContractModule } from 'src/contract/contract.module';
import { Approval, Transaction } from './entities';
import { UsdtListener } from './usdt.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlchemyProvider } from '@ethersproject/providers';
import USDT_ABI from '../ABIS/USDT';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Approval]),
    ContractModule.forRoot({
      provider: new AlchemyProvider('mainnet', ConfigModule.forFeature),
      contracts: [
        {
          addressOrName: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          contractInterface: USDT_ABI,
        },
      ],
    }),
  ],
  providers: [UsdtListener],
})
export class UsdtLoggerModule {}
