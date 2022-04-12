import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ContractSubscriberLoader } from './contract-subscibers.loader';
import { ContractMetadataAccessor } from './contract-metadata.accessor';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { AlchemyProvider } from '@ethersproject/providers';
import { Contract, ContractInterface } from 'ethers';
import { CONTRACTS_PROVIDER } from './tokens';
import { ALCHEMY_CONNECTION } from 'src/blockchain/tokens';
import { ConfigService } from '@nestjs/config';

type Params = {
  provider: AlchemyProvider;
  contracts: {
    addressOrName: string;
    contractInterface: ContractInterface;
  }[];
};

type AsyncRootParams = {};
@Module({})
export class ContractModule {
  static forRoot(params: Params): DynamicModule {
    const contractsProvider = Object.fromEntries(
      params.contracts.map(({ addressOrName, contractInterface }) => [
        addressOrName,
        new Contract(addressOrName, contractInterface, params.provider),
      ]),
    );
    const contractsProviderWithToken = {
      provide: CONTRACTS_PROVIDER,
      useValue: contractsProvider,
    };
    const chainProvider = {
      provide: ALCHEMY_CONNECTION,
      inject: [ConfigService],
      useValue: params.provider,
    };
    return {
      module: ContractModule,
      providers: [
        contractsProviderWithToken,
        DiscoveryService,
        MetadataScanner,
        ContractSubscriberLoader,
        ContractMetadataAccessor,
      ],
      exports: [chainProvider],
    };
  }
}
