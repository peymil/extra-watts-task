import { Module } from '@nestjs/common';
import { ContractSubscriberLoader } from './contract-subscibers.loader';
import { ContractMetadataAccessor } from './contract-metadata.accessor';
import { contractProviders } from './contract.providers';
import { BlockchainModule } from 'src/blockchain/blockchain.module';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';

@Module({
  imports: [BlockchainModule],
  providers: [
    ...contractProviders,
    DiscoveryService,
    MetadataScanner,
    ContractSubscriberLoader,
    ContractMetadataAccessor,
  ],
  exports: [...contractProviders],
})
export class ContractModule {}
